const { response, request } = require('express');
const Carrito = require("../models/carrito");

const carritoGet = async (req, res) =>{
    try {
        const {id} = req.params;
        const carrito = await Carrito.findById(id)
        .populate("productos.producto","nombre precio") // se pueden aclarar mas campos
        .populate("paquetes.paquete", "nombre precio").exec(); //se pueden aclarar mas campos
        
        if(!carrito){
            return res.status(404).json({ mensaje: "No se encontró el carrito" });
        }

        res.json({
            mensaje:"Carrito obtenido",
            carrito
        });

    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ mensaje: "Error al obtener el carrito" });
    }
}

// const carritoPost = async (req, res) =>{
//     try {
//         const {productos, paquetes} = req.body
//         const carrito = new Carrito({productos, paquetes});

//         await carrito.save();

//         res.json({
//             mensaje:"Carrito creado",
//             carrito
//         });

//     } catch (error) {
//         console.error("Error al cargar el carrito:", error);
//         res.status(500).json({ mensaje: "Error al cargar el carrito" });
//     }
// }

const carritoPut = async (req, res) =>{
    try {
        const {id} = req.params;
        const {productos, paquetes} = req.body
        
        const carrito = await Carrito.findByIdAndUpdate(id, {productos, paquetes}, {new: true});

        if(!carrito){
            return res.status(404).json({ mensaje: "No se encontró el carrito" });
        }

        res.json({
            mensaje:"Carrito modificado",
            carrito
        });

    } catch (error) {
        console.error("Error al modificar el carrito:", error);
        res.status(500).json({ mensaje: "Error al modificar el carrito" });
    }
}
const carritoDelete = async (req, res) =>{
    try {
        const {id} = req.params;
        
        const carrito = await Carrito.findByIdAndDelete(id);

        if(!carrito){
            return res.status(404).json({ mensaje: "No se encontró el carrito" });
        }

        res.json({
            mensaje:"Carrito borrado",
        });

    } catch (error) {
        console.error("Error al borrar el carrito:", error);
        res.status(500).json({ mensaje: "Error al borrar el carrito" });
    }
}





module.exports = {
    carritoGet,
    // carritoPost,
    carritoPut,
    carritoDelete,
}