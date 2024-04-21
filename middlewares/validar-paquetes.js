const { request, response } = require("express");
const Paquete = require("../models/paquete");

const paquetesValidos = async (req, res, next) => {
    try {
        const { paquetes } = req.body;
        if(paquetes){
            for (const p of paquetes) {
                try {
                    const paquete = await Paquete.findById(p.paquete);
                    if (!paquete) {
                        return res.status(401).json({
                            msj: `El ID ${p.paquete} de paquete no existe`
                        });
                    }
                } catch (error) {
                    console.error("Error al buscar el paquete:", error);
                    return res.status(500).json({ mensaje: "Error interno del servidor" });
                }
            }
        }
        next();
    } catch (error) {
        console.error("Error al validar paquetes:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

// Validar si el nombre del producto existe
const nombrePaqueteExiste = async (req, res, next) => {
    const nombre = req.body.nombre.toUpperCase();
    const existePaquete = await Paquete.findOne({ nombre });

    const id = req.params;
    if(!id){
        if (existePaquete) {
            return res.status(401).json({
                msj:`El nombre "${nombre}" ya está en uso.`});
        }
    } else{
        if (existePaquete && existePaquete!=id) {
            return res.status(401).json({
                msj:`El nombre "${nombre}" ya está en uso.`});
        }
    }

    next();
}


module.exports = {
    paquetesValidos,
    nombrePaqueteExiste
}
