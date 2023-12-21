import express from 'express'
import mongoose from 'mongoose'
import apiRoutes from './routes/apiRoutes.js'
import Dev from './models/programuotojas.js'

//sitie dalykai yra standartai sukuriant projekta su express ir mongo db

const app = express()
app.use(express.json()) // mum reikia kas suparsintu musu duomenis
app.use(express.static('public')) //css

const dbURI = 'mongodb+srv://darja1:1973468257931@node1.vh7vhbz.mongodb.net/restapi'
mongoose.connect(dbURI)
    .then(result => app.listen(3005)) //portas
    .catch(err => console.log(err))

//nustatome view engine ir ejs
app.set('view engine', 'ejs')

//-----------------

//routes
//uzkrauna titulini puslapi
app.get('/', (req,res) => res.render('home')) //kai einam i titulini, norim kad atvaizduotu 'home' puslapi
app.get('/create-dev', (req, res) => res.render('createDev'));
app.get('/edit-dev:id', (req, res) => res.render('editDev'));

app.use('/api', apiRoutes)


