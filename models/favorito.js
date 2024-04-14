const { Schema, model } = require('mongoose');

const FavoritoSchema = Schema({
    productos: [{
        producto: {type: Schema.Types.ObjectId, ref: 'Producto', require: [true, 'el producto es obligatorio']},
        cantidad: {type: Number, default: 1}
    }],
    paquetes: [{
        paquete: {type: Schema.Types.ObjectId, ref: 'Paquete', require: [true, 'el paquete es requerido']},
        cantidad: {type: Number, default: 1}
    }]
});

module.exports = model('Favorito', FavoritoSchema);