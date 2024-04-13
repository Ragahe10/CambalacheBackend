const { response, request } = require('express');
const Producto = require('../models/productos');

const productosPost = async (req = request, res = response) => {
    const datos = req.body;
    const { nombre, descripcion, tipo, precio } = datos;
    const producto = new Producto({ nombre, descripcion, tipo, precio })
    await producto.save()
    res.json({
        msg: 'Producto creado correctamente',
        producto
    })
}

const productosGet = async (req = request, res = response) => {
    const { desde = 0, limite = 10 } = req.query
    const query = { activo: true }
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).skip(desde).limit(limite)
    ])
    res.json({
        msg: 'Productos obtenidos correctamente',
        total,
        productos
    })
}

const productoGet = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    res.json({
        msg: 'Productos obtenidos correctamente 2',
        producto
    })
}

const productosPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombre, descripcion, tipo, precio, ...resto } = req.body
    resto.nombre = nombre;
    resto.descripcion = descripcion;
    resto.tipo = tipo;
    resto.precio = precio;
    const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });
    res.json({
        msg: 'Productos modificado correctamente',
        producto

    })
}

const productosDelete = async (req = request, res = response) => {
    const { id } = req.params;
    // const productoBorrado = await Producto.findByIdAndDelete(id);
    const producto = await Producto.findById(id);
    if (!producto.activo) {
        res.json({
            msg: 'El producto no existe'
        })
    }
    const productoDesactivado = await Producto.findByIdAndUpdate(id, { activo: false }, { new: true });
    res.json({
        msg: 'Producto borrado con éxito',
        productoDesactivado
    })
}

module.exports = { productosPost, productosGet, productoGet, productosPut, productosDelete }