const { response , request } = require('express');
const Usuario = require('../models/usuario');
// let bcrypt = require('bcryptjs');


const usuarioPost = async (req=request, res=response) => {
    //recibir el cuerpo de la peticion
    const datos = req.body;
    const {nombre, correo, password, rol} = datos;
    const usuario = new Usuario ({nombre, correo, password, rol});

    //encriptar la contraseña
    // const salt = bcrypt.genSaltSync(10)

    //guardar en la bd
    await usuario.save();

    res.json({
        mensaje: "Usuario creado correctamente",
        usuario
    })
}



const usuariosGet = async (req=request, res=response) => {
    const datos = req.query;
    const query = {estado: true};

    const [ total, usuarios ] =  await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

     res.json({
         mensaje: 'Usuarios obtenidos',
         total,
         usuarios
    })
}

const usuarioGet = async (req=request, res=response) => {
    const { id } = req.params;

    //buscar el usuario
    const usuario = await Usuario.findById(id);

    res.json({
        mensaje: 'Usuario obtenido correctamente',
        usuario
    })
}

const usuarioPut = async (req=request, res=response) => {
    const { id } = req.params;

    //obtener datos para actulizar
    const { password, correo, ...resto } = req.body;

    //si actualiza el password, hay que cifrarlo o encriptarlo

    resto.password = password;
    resto.correo = correo;

    //buscar el usuario y actualizados
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json({
        mensaje: 'Usuario actualizado correctamente',
        usuario
    })
}

const usuarioDelete = async (req=request, res=response) => {
    const { id } = req.params;

    //para eliminar el registro
    // const usuarioBorrado = await Usuario.findByIdAndDelete(id);

    //para cambiar el estado a false
    const usuario = await Usuario.findById(id);

    if(!usuario.estado) {
        return res.json({
            mensaje: "El usuario no existe"
        })
    }

    const usuarioInactivado = await Usuario.findByIdAndUpdate(id, {estado: false}, {new:true});


    res.json({
        mensaje: 'Usuario borrado correctamente',
        usuarioInactivado
        // usuarioBorrado
    })
}

module.exports = {
    usuarioPost,
    usuariosGet,
    usuarioGet,
    usuarioPut,
    usuarioDelete,
}