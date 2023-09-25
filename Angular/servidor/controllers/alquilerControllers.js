const Alquiler = require('../models/Alquiler')

exports.crearAlquiler = async (req, res) => {
    try {
        let alquiler;
        alquiler = new Alquiler(req.body);
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
        const {codigofactura, codigoherramienta, diasprestamo, deposito} = req.body
        let alquiler = await Alquiler.findById(req.params.id);
        
        if(!alquiler){
            res.status(500).send('El alquiler no Existe');
        }
        alquiler.codigofactura= codigofactura;
        alquiler. codigoherramienta= codigoherramienta;
        alquiler.diasprestamo = diasprestamo;
        alquiler.deposito = deposito;

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

        await Alquiler.findByIdAndRemove({_id:req.params.id})
        
        res.json({msg : "Alquiler Eliminada"});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}