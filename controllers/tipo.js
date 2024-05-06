const { response, request } = require('express');
const Tipo = require('../models/tipo');

const tiposGet = async (req = request, res = response) => {
    try {
        // const { desde = 0, limite = 10 } = req.query;
        // const query = { estado: true };
        const [total, tipos] = await Promise.all([
            Tipo.countDocuments(),
            Tipo.find()
        ]);
        res.json({
            msg: 'Tipos obtenidos correctamente',
            total,
            tipos
        });
    } catch (error) {
        console.error('Error al obtener los tipos:', error);
        res.status(500).json({ msg: 'Error al obtener los tipos' });
    }
};

const tipoGet = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findById(id);
        res.json({
            msg: 'Tipo obtenido correctamente',
            tipo
        });
    } catch (error) {
        console.error('Error al obtener el tipo:', error);
        res.status(500).json({ msg: 'Error al obtener el tipo' });
    }
};

const tiposPost = async (req = request, res = response) => {
    try {
        const tipo = req.body.tipo.toUpperCase();
        const data = {
            tipo
        };
    
        const tipoM = new Tipo(data);
    
        await tipoM.save();
    
        res.json({
            msg: 'Tipo creado correctamente'
        });
    } catch (error) {
        console.error('Error al crear el tipo:', error);
        res.status(500).json({ msg: 'Error al crear el tipo' });
    }
};

const tiposPut = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipo = req.body.tipo.toUpperCase();
    
        const data = {
            tipo
        };
        const tipoM = await Tipo.findByIdAndUpdate(id, data, { new: true });
        res.json({
            msg: 'Tipo modificado correctamente',
            tipoM
        });
    } catch (error) {
        console.error('Error al modificar el tipo:', error);
        res.status(500).json({ msg: 'Error al modificar el tipo' });
    }
};

const tiposDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findById(id);
        if (!tipo.estado) {
            res.json({
                msg: 'El tipo no existe'
            });
        }
        const tipoDesactivado = await Tipo.findByIdAndDelete(id);
        res.json({
            msg: 'Tipo borrado con éxito',
            tipoDesactivado
        });
    } catch (error) {
        console.error('Error al eliminar el tipo:', error);
        res.status(500).json({ msg: 'Error al eliminar el tipo' });
    }
};

module.exports = { 
    tiposPost, 
    tiposGet, 
    tipoGet, 
    tiposPut, 
    tiposDelete 
};