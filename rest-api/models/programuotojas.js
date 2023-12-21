import mongoose from "mongoose";

//sukuriame Schema modeliui
const Schema = mongoose.Schema

//deliojam struktura
const DevSchema = new Schema({
    vardas: {
        type: String,
        required: [true, 'Prašome įrašyti savo vardą']
    },
    tech: {
        type: [String], //gali buti keli skills, todel masyvas
        required: [true, 'Prašome pasirinkti technologijas']
    },
    laisvas: {
        type: Boolean,
        default: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], //nes koordinates susideda is 2 skaiciu
            required: true
        }
    }
})

//turime nurodity indeksa pagal location
//2dsphere -
DevSchema.index({location:'2dsphere'})

const Dev = mongoose.model('Dev', DevSchema)

export default Dev