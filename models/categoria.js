const { Schema, model } = require('mongoose');
const { categoriaGet } = require('../controllers/categoria');
const CategoriaSchema = Schema({
    categoria: {type: String, required:[true, 'el nombre de la categoria es obligatorio'], unique: true}
})

module.exports = model('Categoria', CategoriaSchema) 
