const { Schema, model } = require('mongoose');
// const { removeAllListeners } = require('nodemon');

const UsuarioSchema = Schema({
    nombre: {type: String, required:[true, 'El nombre es obligatorio']},
    correo: {type: String, required:[true, 'El correo es obligatorio'], unique: true},
    password: {type: String, required:[true, 'El contraseña es obligatoria']},
    carrito:{type: Schema.Types.ObjectId, ref: 'Carrito'},
    favorito:{type: Schema.Types.ObjectId, ref: 'Favorito'},
    rol: {type: String, required: true},
    estado: {type: Boolean, default: true},
});

//quitar datos extras en la respuesta JSON
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario' , UsuarioSchema);