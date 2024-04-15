const { response, request } = require('express');
const Tipo = require('../models/tipo');

const tiposGet = async (req = request, res = response) => {
    const { desde = 0, limite = 10 } = req.query
    const query = { estado: true }
    const [total, tipos] = await Promise.all([
        Tipo.countDocuments(query),
        Tipo.find(query).skip(desde).limit(limite)
    ])
    res.json({
        msg: 'tipos obtenidos correctamente',
        total,
        tipos
    })
}

const tipoGet = async (req = request, res = response) => {
    const { id } = req.params;
    const tipo = await Tipo.findById(id);
    res.json({
        msg: 'Tipo obtenida correctamente ',
        tipo
    })
}

const tiposPost = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    
    // const tipoDB = await Tipo.findOne({nombre});

    // if (tipoDB){
    //     res.status(400).json({
    //         msg: 'el tipo ya existe'
    //     });
    // };

    const data = {
        nombre
    }

    const tipo = new Tipo(data);

    await tipo.save()

    res.json({
        msg: 'Tipo creado correctamente'
    })
}

const tiposPut = async (req = request, res = response) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre
    }
    const tipo = await Tipo.findByIdAndUpdate(id, data, { new: true });
    res.json({
        msg: 'tipo modificado correctamente',
        tipo

    })
}

const tiposDelete = async (req = request, res = response) => {
    const { id } = req.params;
    // const productoBorrado = await Producto.findByIdAndDelete(id);
    const tipo = await Tipo.findById(id);
    if (!tipo.estado) {
        res.json({
            msg: 'El tipo no existe'
        })
    }
    const tipoDesactivado = await Tipo.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        msg: 'Tipo borrada con éxito',
        tipoDesactivado
    })
}

module.exports = { 
    tiposPost, 
    tiposGet, 
    tipoGet, 
    tiposPut, 
    tiposDelete 
}