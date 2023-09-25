const mongoose = require('mongoose')

const alquilerSchema = mongoose.Schema({
    codigofactura:{
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
    fechaCreacion: {
        type:Date,
        default: Date.now()
    },

})

module.exports = mongoose.model('Alquiler', alquilerSchema)