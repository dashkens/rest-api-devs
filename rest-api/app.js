import express from 'express'
import mongoose from 'mongoose'
import apiRoutes from './routes/apiRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

//sitie dalykai yra standartai sukuriant projekta su express ir mongo db
const app = express()
app.use(express.json()) // mum reikia kas suparsintu musu duomenis
app.use(express.static('public')) //css

mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })

//nustatome view engine ir ejs
app.set('view engine', 'ejs')

//-----------------

//routes
//uzkrauna titulini puslapi
app.get('/', (req,res) => res.render('home')) //kai einam i titulini, norim kad atvaizduotu 'home' puslapi
app.get('/create-dev', (req, res) => res.render('createDev'));
app.get('/edit-dev/:id', (req, res) => res.render('editDev'));

app.use('/api', apiRoutes)


