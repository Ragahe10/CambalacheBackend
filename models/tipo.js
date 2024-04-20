const { Schema, model } = require('mongoose');
const TipoSchema = Schema({
    nombre: {type: String, required:[true, 'el nombre del tipo es obligatorio'], unique: true}
})

module.exports = model('Tipo', TipoSchema) 