const Alquiler = require('../models/Alquiler')
const Producto = require('../models/Producto')

exports.crearAlquiler = async (req, res) => {
    try {
        const { codigoherramienta, diasprestamo} = req.body;

        const productoRelacionado = await Producto.findOne({ nombre: codigoherramienta });
        let alquiler;
        alquiler = new Alquiler(req.body);
        alquiler.total = productoRelacionado.precio * diasprestamo
        await alquiler.save();
        res.send(alquiler)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.obtenerAlquilers = async (req,res) =>{
    try {
        const alquilers = await Alquiler.find();
        res.json(alquilers);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}
exports.obtenerAlquiler = async (req,res) =>{
    try {
        let alquiler = await Alquiler.findById(req.params.id);

        if(!alquiler){
            res.status(500).send('El Alquiler no Existe');
        }
        res.json(alquiler);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.actualizarAlquiler = async(req, res) =>{
    try {
        const {tipocliente,nombre,telefono,direccion, codigoherramienta, diasprestamo, deposito, total} = req.body
        let alquiler = await Alquiler.findById(req.params.id);
        
        if(!alquiler){
            res.status(500).send('El alquiler no Existe');
        }
        alquiler.tipocliente= tipocliente;
        alquiler.nombre= nombre;
        alquiler.telefono=telefono;
        alquiler.direccion=direccion;
        alquiler. codigoherramienta= codigoherramienta;
        alquiler.diasprestamo = diasprestamo;
        alquiler.deposito = deposito;
        alquiler.total = total;

        alquiler = await Alquiler.findByIdAndUpdate(
            {_id:req.params.id},alquiler,{new: true})
        res.json(alquiler)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.eliminarAlquiler = async (req,res) =>{
    try {
        let alquiler = await Alquiler.findById(req.params.id)

        if(!alquiler){
            res.status(500).send('El alquiler no Existe');
        }

        await Alquiler.findByIdAndDelete({_id:req.params.id})
        
        res.json({msg : "Alquiler Eliminada"});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}