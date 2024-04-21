const { response, request } = require('express');
const Venta = require('../models/venta');
const Usuario = require('../models/usuario');
const jwt = require("jsonwebtoken");

const ventasGet = async (req = request, res = response) => {
    try {
        const [total, ventas] = await Promise.all([
            Venta.countDocuments(),
            Venta.find()
        ]);

        res.json({
            mensaje: 'Ventas obtenidas',
            total,
            ventas
        });
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ mensaje: 'Error al obtener las ventas' });
    }
};

const ventasUsuarioGet = async (req = request, res = response) => {
    try {
        const { idUsuario } = req.params;
        const query = { usuario: idUsuario };
        const [total, ventas] = await Promise.all([
            Venta.countDocuments(query),
            Venta.find(query)
        ]);

        res.json({
            mensaje: 'Ventas obtenidas',
            total,
            ventas
        });
    } catch (error) {
        console.error('Error al obtener las ventas de un usuario:', error);
        res.status(500).json({ mensaje: 'Error al obtener las ventas de un usuario' });
    }
};

const ventasPost = async (req = request, res = response) => {
    try {
        // Recibir el cuerpo de la petición
        const datos = req.body;
        const { productos, paquetes } = datos;
        const token = req.header('x-token');
        const { uid:usuario } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // Crear la venta
        const venta = new Venta({ usuario, productos, paquetes });

        // Guardar la venta en la base de datos
        await venta.save();

        res.json({
            mensaje: 'Venta creada correctamente',
            venta
        });
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).json({ mensaje: 'Error al crear la venta' });
    }
};

const ventaPut = async (req = request, res = response) => {
    try {
        const ventaId = req.params.id;
        const { comprobante, finalizada } = req.body;
        await Venta.findByIdAndUpdate(ventaId, { comprobante, finalizada });
        res.json({
            mensaje: 'La venta se modificó correctamente'
        });
    } catch (error) {
        console.error('Error al modificar la venta:', error);
        res.status(400).json({ mensaje: 'No se pudo modificar la venta' });
    }
};

const ventaDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const ventaEliminada = await Venta.findByIdAndDelete(id);
        if (!ventaEliminada) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }
        res.status(200).json({
            mensaje: 'Venta eliminada correctamente',
            ventaEliminada
        });
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la venta' });
    }
};
// const ventasFiltroGet = async (req = request, res = response) => {
//     /*El siguiente filtro se aplica de la sigiente forma:
//     en la url deberemos poner los parametros de la query que se colocan al final de la url despues de un "?"
//     en este caso sería ?filtro={tipo}&valor={valor}*/
//     const {filtro, valor} = req.query;
//     /*En este caso los valores de filtro serian por lo que desea filtrar, comprobante o finalizada
//     y el valor seria true o false */
//     let query;
//     if(filtro === "comprobante"){
//         query = {comprobante: valor==="true"}
//     }else if(filtro === "finalizada"){
//         query = {finalizada: valor==="true"}
//     }
//     const [total, venta] = await Promise.all([
//         Venta.countDocuments(query),
//         Venta.find(query)
//     ]);

//     res.json({
//         mensaje: 'Ventas obtenidas',
//         total,
//         venta
//     })
// }

module.exports = {
    ventasGet,
    // ventasFiltroGet,
    ventasUsuarioGet,
    ventasPost,
    ventaPut,
    ventaDelete
};