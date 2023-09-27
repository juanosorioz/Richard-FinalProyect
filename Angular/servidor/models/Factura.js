const mongoose = require('mongoose')

const facturaSchema = mongoose.Schema({
    tipocliente:{
        type:String,
        require: true
    },
    nombre: {
        type:String,
        require: true
    },
    telefono: {
        type:Number,
        require: true
    },
    direccion: {
        type:String,
        require: true
    },
    productoF: {
        type:String,
        require: true
    },
    cantidades: {
        type:Number,
        require: true
    },
    price: {
        type:Number,
        require: true
    },
    fechaCreacion: {
        type:Date,
        default: Date.now()
    },

})

module.exports = mongoose.model('Factura', facturaSchema)