const { Schema, model } = require('mongoose');
// const { removeAllListeners } = require('nodemon');

const UsuarioSchema = Schema({
    nombre: {type: String, required:[true, 'El nombre es obligatorio']},
    correo: {type: String, required:[true, 'El correo es obligatorio'], unique: true},
    password: {type: String, required:[true, 'El contraseña es obligatoria']},
    // favorito:{type: Schema.Types.ObjectId, ref: 'Favorito'},
    // carrito:{type: Schema.Types.ObjectId, ref: 'Carrito'},
    rol: {type: String, required: true},
    estado: {type: Boolean, default: true},
});

module.exports = model('Usuario' , UsuarioSchema);