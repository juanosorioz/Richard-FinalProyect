const Producto = require('../models/Producto')

exports.crearProducto = async (req, res) => {
    try {
        let producto;
        producto = new Producto(req.body);
        await producto.save();
        res.send(producto)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.obtenerProductos = async (req,res) =>{
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}
exports.obtenerProducto = async (req,res) =>{
    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(500).send('El producto no Existe');
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.actualizarProducto = async(req, res) =>{
    try {
        const {nombre, categoria, cantidad, precio} = req.body
        let producto = await Producto.findById(req.params.id);
        
        if(!producto){
            res.status(500).send('El producto no Existe');
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.cantidad = cantidad;
        producto.precio = precio;

        producto = await Producto.findByIdAndUpdate(
            {_id:req.params.id},producto,{new: true})
        res.json(producto)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.eliminarProducto = async (req,res) =>{
    try {
        let producto = await Producto.findById(req.params.id)

        if(!producto){
            res.status(500).send('El producto no Existe');
        }

        await Producto.findByIdAndRemove({_id:req.params.id})
        
        res.json({msg : "Producto Eliminado"});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}