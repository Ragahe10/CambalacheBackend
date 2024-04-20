const { response, request } = require('express');
const Favorito = require("../models/favorito");

const favoritoGet = async (req, res) =>{
    try {
        const {id} = req.params;
        const favorito = await Favorito.findById(id)
        .populate("productos.producto","nombre precio") // se pueden aclarar mas campos
        .populate("paquetes.paquete", "nombre precio").exec(); //se pueden aclarar mas campos
        
        if(!favorito){
            return res.status(404).json({ mensaje: "No se encontró el favorito" });
        }

        res.json({
            mensaje:"Favorito obtenido",
            favorito
        });

    } catch (error) {
        console.error("Error al obtener el favorito:", error);
        res.status(500).json({ mensaje: "Error al obtener el favorito" });
    }
}

// const favoritoPost = async (req, res) =>{
//     try {
//         const {productos, paquetes} = req.body
//         const favorito = new Favorito({productos, paquetes});

//         await favorito.save();

//         res.json({
//             mensaje:"Favorito creado",
//             favorito
//         });

//     } catch (error) {
//         console.error("Error al cargar el favorito:", error);
//         res.status(500).json({ mensaje: "Error al cargar el favorito" });
//     }
// }

const favoritoPut = async (req, res) =>{
    try {
        const {id} = req.params;
        const {productos, paquetes} = req.body
        
        const favorito = await Favorito.findByIdAndUpdate(id, {productos, paquetes}, {new: true});

        if(!favorito){
            return res.status(404).json({ mensaje: "No se encontró el favorito" });
        }

        res.json({
            mensaje:"Favorito modificado",
            favorito
        });

    } catch (error) {
        console.error("Error al modificar el favorito:", error);
        res.status(500).json({ mensaje: "Error al modificar el favorito" });
    }
}
const favoritoDelete = async (req, res) =>{
    try {
        const {id} = req.params;
        
        const favorito = await Favorito.findByIdAndDelete(id);

        if(!favorito){
            return res.status(404).json({ mensaje: "No se encontró el favorito" });
        }

        res.json({
            mensaje:"Favorito borrado",
        });

    } catch (error) {
        console.error("Error al borrar el favorito:", error);
        res.status(500).json({ mensaje: "Error al borrar el favorito" });
    }
}





module.exports = {
    favoritoGet,
    // favoritoPost,
    favoritoPut,
    favoritoDelete,
}