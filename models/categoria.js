const { Schema, model } = require('mongoose');
const CategoriaSchema = Schema({
    nombre: {type: String, required:[true, 'el nombre de la categoria es obligatorio'], unique: true}
})

module.exports = model('Categoria', CategoriaSchema) 
