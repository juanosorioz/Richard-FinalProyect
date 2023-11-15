const mongoose = require('mongoose')

const alquilerSchema = mongoose.Schema({
    tipocliente:{
        type:String,
        require: true
    },
    nombre:{
        type:String,
        require: true
    },
    telefono:{
        type:Number,
        require: true
    },
    direccion:{
        type:String,
        require: true
    },
    codigoherramienta: {
        type:String,
        require: true
    },
    diasprestamo: {
        type:Number,
        require: true
    },
    deposito: {
        type:Number,
        require: true
    },
    total: {
        type:Number,
        require: true
    },
    fechaCreacion: {
        type:Date,
        default: Date.now()
    },

})

module.exports = mongoose.model('Alquiler', alquilerSchema)