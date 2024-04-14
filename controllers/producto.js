const { response, request } = require('express');
const Producto = require('../models/producto');

const productosPost = async (req = request, res = response) => {
    try {
        const datos = req.body;
        const { nombre, descripcion, tipo, precio } = datos;
        const producto = new Producto({ nombre, descripcion, tipo, precio });
        await producto.save();
        res.json({
            msg: 'Producto creado correctamente',
            producto
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ msg: 'Error al crear el producto' });
    }
};

const productosGet = async (req = request, res = response) => {
    try {
        /*Para la paginacion hay que tener en cuenta que los parametros de query se deben
        incluir en el url con un signo de pregunta al final y separados por &, 
        Ej: localhost:3000/api/producto?desde={valor}&hasta={valor}*/
        const { desde = 0, limite = 10 } = req.query;
        const [total, productos] = await Promise.all([
            Producto.countDocuments(),
            Producto.find().skip(desde).limit(limite)
        ]);
        res.json({
            msg: 'Productos obtenidos correctamente',
            total,
            productos
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ msg: 'Error al obtener los productos' });
    }
};

const productosActivosGet = async (req = request, res = response) => {
    try {
        const { desde = 0, limite = 10 } = req.query;
        const query = { activo: true };
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query).skip(desde).limit(limite)
        ]);
        res.json({
            msg: 'Productos obtenidos correctamente',
            total,
            productos
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ msg: 'Error al obtener los productos' });
    }
};

const productoGet = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);
        res.json({
            msg: 'Producto obtenido correctamente',
            producto
        });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ msg: 'Error al obtener el producto' });
    }
};

const productosPut = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, tipo, precio, ...resto } = req.body;
        resto.nombre = nombre;
        resto.descripcion = descripcion;
        resto.tipo = tipo;
        resto.precio = precio;
        const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });
        res.json({
            msg: 'Producto modificado correctamente',
            producto
        });
    } catch (error) {
        console.error('Error al modificar el producto:', error);
        res.status(500).json({ msg: 'Error al modificar el producto' });
    }
};

const productosDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);
        if (!producto.activo) {
            return res.json({ msg: 'El producto no existe' });
        }
        const productoDesactivado = await Producto.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json({
            msg: 'Producto desactivado con éxito',
            productoDesactivado
        });
    } catch (error) {
        console.error('Error al desactivar el producto:', error);
        res.status(500).json({ msg: 'Error al desactivar el producto' });
    }
};

module.exports = { 
    productosPost, 
    productosGet, 
    productosActivosGet, 
    productoGet, 
    productosPut, 
    productosDelete };