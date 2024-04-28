const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const usuarioPermitidoUD = async (req, res, next) =>{
    try {
        // Para permitir la modificación o eliminación de un usuario, se debe verificar si el ID del usuario logueado
        // corresponde al que se está por modificar o si es un administrador.
        
        // Obtener el token
        const token = req.header('x-token');
        // Obtener el ID de la petición
        const { id } = req.params;

        // Verificar el token y obtener el UID
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // Obtener los datos del usuario autenticado
        const usuario = await Usuario.findById(uid);

        // Verificar si es administrador o si los IDs son iguales
        if (uid === id || usuario.rol === "ADMIN_ROLE") {
            return next();
        } else {
            return res.status(401).json({
                msj: "No tiene permisos para realizar esta acción"
            });
        }
    } catch (error) {
        console.error('Error en usuarioPermitido:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

const adminRole = async (req, res, next) => {
    try {
        // Obtener el token de la petición
        const token = req.header('x-token');
        
        // Verificar el token y obtener el UID
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // Buscar los datos del usuario logueado
        const usuario = await Usuario.findById(uid);

        // Controlar el rol del usuario
        if (usuario.rol === "ADMIN_ROLE") {
            return next();
        } else {
            return res.status(401).json({
                msj: "No tiene permisos para realizar esta acción"
            });
        }
    } catch (error) {
        console.error('Error en adminRole:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

const EsSuFavorito = async (req, res, next) => {
    try {
        // Obtener el token de la petición
        const token = req.header('x-token');
        
        // Verificar el token y obtener el UID
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // Buscar los datos del usuario logueado
        const usuario = await Usuario.findById(uid);

        // Verificar si el favorito del usuario coincide con el ID proporcionado en la solicitud
        if (usuario.favorito._id != req.params.id) {
            return res.status(401).json({
                msj: "No tiene permisos para realizar esta acción"
            });
        }
        // Si todo está bien, continuar con el siguiente middleware
        next();
    } catch (error) {
        // Capturar y manejar cualquier error
        console.error("Error en EsSuFavorito:", error);
        res.status(500).json({ mensaje: "Error en EsSuFavorito" });
    }
}
const EsSuCarrito = async (req, res, next) => {
    try {
        // Obtener el token de la petición
        const token = req.header('x-token');
        
        // Verificar el token y obtener el UID
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // Buscar los datos del usuario logueado
        const usuario = await Usuario.findById(uid);

        // Verificar si el favorito del usuario coincide con el ID proporcionado en la solicitud
        if (usuario.carrito._id != req.params.id) {
            return res.status(401).json({
                msj: "No tiene permisos para realizar esta acción"
            });
        }
        // Si todo está bien, continuar con el siguiente middleware
        next();
    } catch (error) {
        // Capturar y manejar cualquier error
        console.error("Error en EsSuCarrito:", error);
        res.status(500).json({ mensaje: "Error en EsSuCarrito" });
    }
}



module.exports = {
    usuarioPermitidoUD,
    adminRole,
    EsSuCarrito,
    EsSuFavorito
}