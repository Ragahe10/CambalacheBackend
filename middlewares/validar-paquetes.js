const { request, response } = require("express");
const Paquete = require("../models/paquete");

const paquetesValidos = async (req, res, next) => {
    try {
        const { paquetes } = req.body;
        for (const p of paquetes) {
            try {
                const paquete = await Paquete.findById(p);
                if (!paquete) {
                    return res.status(401).json({
                        msj: `El ID ${p} de paquete no existe`
                    });
                }
            } catch (error) {
                console.error("Error al buscar el paquete:", error);
                return res.status(500).json({ mensaje: "Error interno del servidor" });
            }
        }
        next();
    } catch (error) {
        console.error("Error al validar paquetes:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

module.exports = {
    paquetesValidos
}
