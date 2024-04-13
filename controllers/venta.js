const { response, request } = require('express');
const Venta = require('../models/venta');


const ventasGet = async (req = request, res = response) => {

    // Hacemos la consulta
    const datos = req.query;

    // Agarramos solo los que estan disponibles
    // const query = { estado: true };


    // Se cuentan los usuarios que cumplen la consulta y los trae con el find
    const [total, venta] = await Promise.all([
        Venta.countDocuments(),
        Venta.find()
    ])

    res.json({
        mensaje: 'Ventas obtenidas',
        total,
        venta
    })
}

const ventasPost = async (req = request, res = response) => {

    // Recibir el cuerpo de la peticion
    const datos = req.body;

    // Comprobante y finalizada si va??
    const { usuario, productos, paquetes } = datos;

    const venta = new Venta({ datos });

    await venta.save();

    res.json({
        mensaje: 'Venta creada correctamente',
        venta
    })

}

const ventaPut = async (req = request, res = response) => {
    try {
        const ventaId = req.params.id;
        const {comprobante, finalizada} = req.body;
        await Venta.findByIdAndUpdate(ventaId, {comprobante, finalizada});
        res.json({
            mensaje: 'La venta se modificó correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `No se pudo modificar la venta`
        });
    }
}


const ventaDelete = async (req = request, res = response) => {
    try {
        // Extraer el ID de los parámetros de la solicitud
        const { id } = req.params;

        // Intentar encontrar y eliminar la venta por su ID
        const ventaEliminada = await Venta.findByIdAndDelete(id);

        // Verificar si la venta fue encontrada y eliminada correctamente
        if (!ventaEliminada) {
            // Si no se encuentra la venta, enviar una respuesta con el código de estado 404 (No encontrado)
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }

        // Enviar una respuesta con el código de estado 200 (OK) y la venta eliminada
        res.status(200).json({
            mensaje: 'Venta eliminada correctamente',
            ventaEliminada
        });
    } catch (error) {
        // Capturar cualquier error que pueda ocurrir durante la operación y enviar una respuesta de error con el código de estado 500 (Error interno del servidor)
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar la venta' });
    }
};



module.exports = {
    ventasGet,
    ventasPost,
    ventaPut,
    ventaDelete
}