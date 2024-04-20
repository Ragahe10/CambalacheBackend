const { response, request } = require('express');
const Categoria = require('../models/categoria');

const categoriasGet = async (req = request, res = response) => {
    const { desde = 0, limite = 10 } = req.query
    const query = { estado: true }
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).skip(desde).limit(limite)
    ])
    res.json({
        msg: 'Categorias obtenidos correctamente',
        total,
        categorias
    })
}

const categoriaGet = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);
    res.json({
        msg: 'categoria obtenida correctamente ',
        categoria
    })
}

const categoriasPost = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    
    // const categoriaDB = await Categoria.findOne({nombre});

    // if (categoriaDB){
    //     res.status(400).json({
    //         msg: 'la categoria ya existe'
    //     });
    // };

    const data = {
        nombre
    }

    const categoria = new Categoria(data);

    await categoria.save()

    res.json({
        msg: 'categoria creada correctamente'
    })
}

const categoriasPut = async (req = request, res = response) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre
    }
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json({
        msg: 'categoria modificado correctamente',
        categoria

    })
}

const categoriasDelete = async (req = request, res = response) => {
    const { id } = req.params;
    // const productoBorrado = await Producto.findByIdAndDelete(id);
    const categoria = await Categoria.findById(id);
    if (!categoria.estado) {
        res.json({
            msg: 'La categoria no existe'
        })
    }
    const categoriaDesactivada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        msg: 'Categoria borrada con éxito',
        categoriaDesactivada
    })
}

module.exports = { 
    categoriasPost, 
    categoriasGet, 
    categoriaGet, 
    categoriasPut, 
    categoriasDelete 
}