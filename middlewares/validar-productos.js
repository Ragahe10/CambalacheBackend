const Producto = require("../models/producto");

const productosValidos = async (req, res, next) => {
    try {
        const { productos } = req.body;
        if(productos){
            for (const p of productos) {
                try {
                    const producto = await Producto.findById(p.producto);
                    if (!producto) {
                        return res.status(401).json({
                            msg: `El ID ${p} de producto no existe`
                        });
                    }
                } catch (error) {
                    console.error("Error al buscar el producto:", error);
                    return res.status(500).json({ msg: "Error interno del servidor" });
                }
            }
        }
        next();
    } catch (error) {
        console.error("Error al validar productos:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

// Validar si el nombre del producto existe
const nombreProductoExiste = async (req, res, next) => {
    const nombre = req.body.nombre.toUpperCase();
    const existeProducto = await Producto.findOne({ nombre });

    if (existeProducto) {
        return res.status(401).json({
            msj:`El nombre "${nombre}" ya está en uso.`});
    }
    next();
}

module.exports = {
    productosValidos,
    nombreProductoExiste
};