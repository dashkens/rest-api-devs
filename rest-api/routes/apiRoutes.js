import express from 'express'
import * as controller from '../controllers/controller.js'


//sukuriame router
const router = express.Router()

//kontroleryje pasirasysim, ka kiekviena uzklausa (pvz prog_get) turi daryti
router.get('/programuotojai', controller.prog_get) 
router.post('/programuotojai', controller.prog_post) 
router.put('/programuotojai/:id', controller.prog_put) //put leidzia redaguoti. :id, nes noresim redaguoti konkretu programuotoja
router.delete('/programuotojai/:id', controller.prog_delete) 

//eksportuojam, kad galetume nauduotis
export default router