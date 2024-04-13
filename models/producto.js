const { Schema, model } = require('mongoose');
const ProductoSchema = Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio'], unique: true},
    descripcion: {type: String, required: [true, 'La descripcion es obligatoria']},
    tipo: {type: String, required: [true, 'El tipo es obligatorio']},
    precio: {type: Number, required: [true, 'El precio es obligatorio']},
    activo: {type: Boolean, default: true}
})

module.exports = model('Producto', ProductoSchema) 