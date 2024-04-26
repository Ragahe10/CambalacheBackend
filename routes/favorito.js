const express = require('express');
const {favoritoGet, /*favoritoPost,*/ favoritoPut, favoritoDelete,} = require('../controllers/favorito');
const { validarCampos } = require('../middlewares/validar_campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { EsSuFavorito } = require('../middlewares/validar-usuario');
const { paquetesValidos } = require('../middlewares/validar-paquetes');
const { productosValidos } = require('../middlewares/validar-productos');
const router = express.Router();

//Rutas para CRUD

router.get('/:id',
    [
        // validarJWT,
        check('id', 'No es un ID Válido').isMongoId(),
        EsSuFavorito,
        validarCampos
    ],
    favoritoGet);

router.put('/:id',
    [
        // validarJWT,
        check('id', 'No es un ID Válido').isMongoId(),
        EsSuFavorito,
        paquetesValidos,
        productosValidos,
        validarCampos
    ],
    favoritoPut);

router.delete('/:id',
    [
        // validarJWT,
        check('id', 'No es un ID Válido').isMongoId(),
        EsSuFavorito,
        validarCampos
    ],
    favoritoDelete);

module.exports = router;
