const Usuario = require('../models/usuario');
const Rol = require('../models/rol');


//validar el email de usuario
const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo}) ;

    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra en la base de datos registrado`);
    }
}

//validar si el usuario existe
const usuarioExiste = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El id ${id} no corresponde a ningun usuario registrado`);
    }
}

//validar rol
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol});

    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste
}