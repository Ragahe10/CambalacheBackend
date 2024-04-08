const { Schema, model} = require('mongoose');

const VentaSchema = Schema({
    usuario : { type: Schema.Types.ObjectId , ref: 'Usuario', require: [true, 'El ussuario es obligatorio']},
    productos: [{
        producto: {type: Schema.Types.ObjectId, ref: 'Producto', require: [true, 'el producto es obligatorio']},
        cantidad: {type: Number, default: 1}
    }],
    paquetes: [{
        paquete: {type: Schema.Types.ObjectId, ref: 'Paquete', require: [true, 'el paquete es requerido']},
        cantidad: {type: Number, default: 1}
    }],
    comprobante: {type: Boolean, default: false},
    finalizada: {type: Boolean, default: false}
});

module.exports = model('Venta', VentaSchema);