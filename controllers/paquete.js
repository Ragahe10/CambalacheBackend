const { response, request } = require('express');
const Paquete = require('../models/paquete');

const paquetesActivosGet = async (req, res) => {
    try {
        const query = { estado: true }; // filtro de consulta
        const [total, paquetes] = await Promise.all([
            Paquete.countDocuments(query),// cantidad de elementos
            Paquete.find(query).populate('productos.producto', 'nombre imagenes precio tipo')//especificar campos a traer
        ]);

        res.json({
            mensaje: "Paquetes obtenidos",
            total,
            paquetes //comentar posteriormente
        });
    } catch (error) { // 500 error de servidor
        console.error("Error al obtener paquetes activos:", error);
        res.status(500).json({ mensaje: "Error al obtener paquetes activos" });
    }
}

const paquetesGet = async (req = request, res = response) => {
    try {
        const [total, paquetes] = await Promise.all([
            Paquete.countDocuments(),
            Paquete.find().populate('productos.producto', 'nombre imagenes precio tipo')//especificar campos a traer
        ]);

        res.json({
            mensaje: "Paquetes obtenidos",
            total,
            paquetes 
        });
    } catch (error) { // 500 error de servidor
        console.error("Error al obtener todos los paquetes:", error);
        res.status(500).json({ mensaje: "Error al obtener todos los paquetes" });
    }
}

const paqueteGet = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const paquete = await Paquete.findById(id).populate('productos.producto', 'nombre imagenes precio tipo')//especificar campos a traer;

        if (!paquete) {
            return res.status(404).json({ mensaje: "No se encontró el paquete" });
        }

        res.json({
            mensaje: "Paquete obtenido",
            paquete
        });
    } catch (error) { // 500 error de servidor
        console.error("Error al obtener el paquete:", error);
        res.status(500).json({ mensaje: "Error al obtener el paquete" });
    }
}

const paquetePost = async (req = request, res = response) => {
    try {
        const nombreDB = req.body.nombre.toUpperCase();

        const {descripcion, precio, productos, categoria } = req.body;
        const nombre = req.body.nombre.toUpperCase();
        const paquete = new Paquete({ nombre, descripcion, precio, productos, categoria });

        await paquete.save();

        res.json({
            mensaje: "Paquete creado",
            paquete
        });
    } catch (error) { // 500 error de servidor
        console.error("Error al crear el paquete:", error);
        res.status(500).json({ mensaje: "Error al crear el paquete" });
    }
}

const paquetePut = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const {descripcion, precio, productos, categoria } = req.body;
        const nombre = req.body.nombre.toUpperCase();
        const paquete = await Paquete.findByIdAndUpdate(id, {descripcion, precio, productos, categoria, nombre}, { new: true });

        if (!paquete) {
            return res.status(404).json({ msg: "No se encontró el paquete para actualizar" });
        }

        res.json({
            msg: "Se actualizó el paquete",
            paquete
        });
    } catch (error) { // 500 error de servidor
        console.error("Error al actualizar el paquete:", error);
        res.status(500).json({ msg: "Error al actualizar el paquete" });
    }
}

const paqueteDelete = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const paquete = await Paquete.findByIdAndDelete(id);

        if (!paquete) {
            return res.status(404).json({ mensaje: 'No se encontró el paquete para eliminar' });
        }

        res.json({ mensaje: 'Paquete eliminado correctamente', paquete });
    } catch (error) { // 500 error de servidor
        console.error("Error al eliminar el paquete:", error);
        res.status(500).json({ mensaje: "Error al eliminar el paquete" });
    }
}

module.exports = {
    paquetesActivosGet,
    paquetesGet,
    paqueteGet,
    paquetePost,
    paquetePut,
    paqueteDelete
}