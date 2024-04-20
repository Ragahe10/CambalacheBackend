const { Schema, model } = require('mongoose');

const FavoritoSchema = Schema({
    productos: [{
        producto: {type: Schema.Types.ObjectId, ref: 'Producto', require: [true, 'el producto es obligatorio']},
    }],
    paquetes: [{
        paquete: {type: Schema.Types.ObjectId, ref: 'Paquete', require: [true, 'el paquete es requerido']},
    }]
});

module.exports = model('Favorito', FavoritoSchema);