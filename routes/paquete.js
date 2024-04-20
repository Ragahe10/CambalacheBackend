const express = require('express');
const {paquetesActivosGet, paquetesGet, paqueteGet, paquetePost, paquetePut, paqueteDelete} = require('../controllers/paquete');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { adminRole } = require('../middlewares/validar-usuario');
const { productosValidos } = require('../middlewares/validar-productos');
const { nombrePaqueteExiste, esCategoriaValido } = require('../helpers/db-validators');
const router = express.Router();

//Rutas para CRUD

router.get('/activos',
    [
        validarJWT,
        validarCampos
    ],
    paquetesActivosGet);

router.get('/',
    [
        validarJWT,
        adminRole,
        validarCampos
    ],
    paquetesGet);

router.get('/:id',
    [
        validarJWT,
        check('id', 'No es un ID Válido').isMongoId(),
        validarCampos   
    ],
    paqueteGet);

router.post('/',
    [
        validarJWT,
        productosValidos,
        check('nombre').custom(nombrePaqueteExiste),
        check('descripcion', 'La descripción es obligatoria').notEmpty(),
        check('precio', 'El precio es obligatorio').notEmpty(),
        check('precio', 'El precio debe ser un valor numérico').isFloat({ min: 0 }),
        check('categoria').custom(esCategoriaValido),
        validarCampos
    ],
    paquetePost);

router.put('/:id',
    [
        validarJWT,
        productosValidos,
        check('id', 'No es un ID Válido').isMongoId(),
        check('nombre').custom(nombrePaqueteExiste),
        check('categoria').custom(esCategoriaValido),
        validarCampos
    ],
    paquetePut);

router.delete('/:id',
    [
        validarJWT,
        adminRole,
        check('id', 'No es un ID Válido').isMongoId(),
        validarCampos
    ],
    paqueteDelete);

module.exports = router;