const Producto = require("../models/producto");

const productosValidos = async (req, res, next) => {
    try {
        const { productos } = req.body;
        for (const p of productos) {
            try {
                const producto = await Producto.findById(p);
                if (!producto) {
                    return res.status(401).json({
                        msj: `El ID ${p} de producto no existe`
                    });
                }
            } catch (error) {
                console.error("Error al buscar el producto:", error);
                return res.status(500).json({ mensaje: "Error interno del servidor" });
            }
        }
        next();
    } catch (error) {
        console.error("Error al validar productos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

module.exports = {
    productosValidos
};