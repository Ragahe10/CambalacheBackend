const express = require('express');
const {carritoGet,/* carritoPost,*/ carritoPut, carritoDelete,} = require('../controllers/carrito');
const { validarCampos } = require('../middlewares/validar_campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { EsSuCarrito } = require('../middlewares/validar-usuario');
const { productosValidos } = require('../middlewares/validar-productos');
const { paquetesValidos } = require('../middlewares/validar-paquetes');
const router = express.Router();

//Rutas para CRUD

router.get('/:id',
    [
        // validarJWT,
        check('id', 'No es un ID Válido').isMongoId(),
        EsSuCarrito,
        validarCampos
    ],
    carritoGet);

router.put('/:id',
    [
        // validarJWT,
        check('id', 'No es un ID Válido').isMongoId(),
        EsSuCarrito,
        productosValidos,
        paquetesValidos,
        validarCampos
    ],
    carritoPut);

router.delete('/:id',
    [
        // validarJWT,
        check('id', 'No es un ID Válido').isMongoId(),
        EsSuCarrito,
        validarCampos
    ],
    carritoDelete);

module.exports = router;
