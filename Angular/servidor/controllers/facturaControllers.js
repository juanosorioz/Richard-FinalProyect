const Factura = require('../models/Factura')

exports.crearFactura = async (req, res) => {
    try {
        let factura;
        factura = new Factura(req.body);
        await factura.save();
        res.send(factura)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.obtenerFacturas = async (req,res) =>{
    try {
        const facturas = await Factura.find();
        res.json(facturas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}
exports.obtenerFactura = async (req,res) =>{
    try {
        let factura = await Factura.findById(req.params.id);

        if(!factura){
            res.status(500).send('La factura no Existe');
        }
        res.json(factura);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.actualizarFactura = async(req, res) =>{
    try {
        const {tipocliente, nombre, telefono, direccion, identificacion} = req.body
        let factura = await Factura.findById(req.params.id);
        
        if(!factura){
            res.status(500).send('La Factura no Existe');
        }
        factura.tipocliente= tipocliente;
        factura.nombre = nombre;
        factura.telefono = telefono;
        factura.direccion = direccion;
        factura.identificacion = identificacion;

        factura = await Factura.findByIdAndUpdate(
            {_id:req.params.id},factura,{new: true})
        res.json(factura)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.eliminarFactura = async (req,res) =>{
    try {
        let factura = await Factura.findById(req.params.id)

        if(!factura){
            res.status(500).send('La Factura no Existe');
        }

        await Factura.findByIdAndRemove({_id:req.params.id})
        
        res.json({msg : "Factura Eliminada"});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}