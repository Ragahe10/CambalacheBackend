const { response, request } = require('express');
const Categoria = require('../models/categoria');

const categoriasGet = async (req = request, res = response) => {
    try {
        // const { desde = 0, limite = 10 } = req.query;
        // const query = { estado: true };
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(),
            Categoria.find()
        ]);
        res.json({
            msg: 'Categorías obtenidas correctamente',
            total,
            categorias
        });
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ msg: 'Error al obtener las categorías' });
    }
};

const categoriaGet = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id);
        res.json({
            msg: 'Categoría obtenida correctamente',
            categoria
        });
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ msg: 'Error al obtener la categoría' });
    }
};

const categoriasPost = async (req = request, res = response) => {
    try {
        const categoria = req.body.categoria.toUpperCase();
        
        const data = {
            categoria
        };
    
        const categoriaM = new Categoria(data);
    
        await categoriaM.save();
    
        res.json({
            msg: 'Categoría creada correctamente'
        });
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).json({ msg: 'Error al crear la categoría' });
    }
};

const categoriasPut = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const categoria = req.body.categoria.toUpperCase();
    
        const data = {
            categoria
        };
        const categoriaM = await Categoria.findByIdAndUpdate(id, data, { new: true });
        res.json({
            msg: 'Categoría modificada correctamente',
            categoriaM
        });
    } catch (error) {
        console.error('Error al modificar la categoría:', error);
        res.status(500).json({ msg: 'Error al modificar la categoría' });
    }
};

const categoriasDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id);
        if (!categoria.estado) {
            res.json({
                msg: 'La categoría no existe'
            });
        }
        const categoriaBorrada = await Categoria.findByIdAndDelete(id);
        res.json({
            msg: 'Categoría borrada con éxito',
            categoriaBorrada
        });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ msg: 'Error al eliminar la categoría' });
    }
};

module.exports = { 
    categoriasPost, 
    categoriasGet, 
    categoriaGet, 
    categoriasPut, 
    categoriasDelete 
};