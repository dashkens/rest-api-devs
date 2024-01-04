import Dev from '../models/programuotojas.js'

//dar reikes papildyti, pvz tikrinimas, jei vardai sutampa ir pan.
const handleErrors = (err) => {
    let errors = {vardas: '', tech: '', laisvas: '', location: ''}
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    } 
}



export const prog_get = (req, res) => {
    //longitute
    const lng = parseFloat(req.query.lng) //query - tai, ko ieskome
    //lattitude
    const lat = parseFloat(req.query.lat)

    console.log('Parsed Coordinates: ', lng, ' ', lat)

    Dev.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point', 
                    coordinates: [lng,lat]
                },
                distanceField: 'distance',
                spherical: true,
                maxDistance: 100000
            }
        }
    ])
    .then(devs => {
        console.log('Found Devs: ', devs)
        res.send(devs)
    })
    .catch(error => {
        console.error('Error: ', error)
        res.status(500).send(error.message)
    })
}

export const prog_post = async(req, res) => {
    const {vardas, tech, laisvas, location} = req.body //duomenys ateis is programuotojas.js failo
    try {
        const dev = await Dev.create({vardas, tech, laisvas, location})
        res.status(201).json({dev: dev._id})
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

export const prog_put = (req, res) => {
    //req.params.id - ima ID is url, ir nurodome kad tai yra _id
    Dev.findByIdAndUpdate({_id: req.params.id}, req.body) //req.body - duomenys, kuriuos noresime keisti 
    // indByIdAndUpdate - pakeis duomenys tik DB, bet kai renderisim, nebus atnaujinima
        .then(() => {
            //sia funkcija atnaujins duomenis ir matysim tai po renderinimo
            Dev.findOne({_id: req.params.id}) 
                .then(dev => res.send(dev))
        })
        .catch(err => {
            console.log(err)
            req.status(500).json({error: 'Internal server error'})
        })

}

export const prog_delete = (req, res) => {
    Dev.findByIdAndDelete({_id: req.params.id}) //cia yra mongoose funkcija, kuri susiras pagal ID ir string. underscore - nes MongoDB sukuria su ID, 
        .then(dev => res.send(dev))
        .catch(err => console.log(err))
}

export const prog_getById = async (req, res) => {
    try {
        const developer = await Dev.findById(req.params.id);

        if (developer) {
            res.status(200).json(developer );
        } else {
            res.status(404).send('Developer was not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};