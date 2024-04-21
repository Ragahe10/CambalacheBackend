const { Schema, model} = require('mongoose');
const categoria = require('./categoria');

const PaqueteSchema = Schema({
    nombre : { type: String , require: [true, 'El nombre del paquete es obligatorio'], unique: true},
    descripcion: {type: String, require: [true, 'La descripcion es requerida'], minlength: [15, 'La descripcion debe ser minimamente de 15 caracteres']},
    precio: {type: Number, required: [true, 'el precio es obligatorio'] },
    productos: [{
        producto: {type: Schema.Types.ObjectId, ref: 'Producto', require: true},
        cantidad: {type: Number, default: 1}
    }],
    categoria: {type: String, required: [true, 'La categoria es obligatorio']},
    estado: {type: Boolean, default: true}
});

module.exports = model('Paquete', PaqueteSchema); 