const { Router } = require('express');
const {ventasGet, ventasUsuarioGet,/* ventasFiltroGet, */ventasPost, ventaPut, ventaDelete} = require('../controllers/venta');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { paquetesValidos } = require('../middlewares/validar-paquetes');
const { productosValidos } = require('../middlewares/validar-productos');
const { validarCampos } = require('../middlewares/validar_campos');
const router = Router();

//Rutas para CRUD

router.get('/',
    [
        // validarJWT,
        validarCampos
    ],
    ventasGet);

router.get('/usuario/:idUsuario',
    [
        // validarJWT,
        check('idUsuario', 'No es un ID Válido').isMongoId(),
        validarCampos
    ],
    ventasUsuarioGet);

// router.get('/filtro/', ventasFiltroGet);

router.post('/',
    [
        // validarJWT,
        paquetesValidos,
        productosValidos,
        validarCampos
    ],
    ventasPost);

router.put('/:id',
    [
        // validarJWT,
        check('id', 'No es un ID Válido').isMongoId(),
        paquetesValidos,
        productosValidos,
        validarCampos
    ],
    ventaPut);

router.delete('/:id',
    [
        // validarJWT,
        check('id', 'No es un ID Válido').isMongoId(),
        validarCampos,
    ],
    ventaDelete);

module.exports = router;