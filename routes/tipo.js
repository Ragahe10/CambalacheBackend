const { Router } = require('express');
const { tiposPost, tiposGet, tipoGet, tiposPut, tiposDelete } = require('../controllers/tipo');
const { validarCampos } = require('../middlewares/validar_campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { adminRole } = require('../middlewares/validar-usuario');
const { tipoExiste } = require('../middlewares/validar-tipos');


const router = Router();

router.get('/:id',
    [
        check('id' , 'No es un ID Válido').isMongoId(),
        validarCampos
    ],
    tipoGet)

router.get('/', tiposGet)

router.post('/',
    [
        // validarJWT,
        // adminRole,
        check('tipo',' el nombre es obligatorio').notEmpty(),
        tipoExiste,
        validarCampos
    ],
    tiposPost)

router.put('/:id',
    [
        // validarJWT,
        // adminRole,
        check('id' , 'No es un ID Válido').isMongoId(),
        check('tipo',' el nombre es obligatorio').notEmpty(),
        tipoExiste,
        validarCampos
    ],
    tiposPut)

router.delete('/:id',
    [
        // validarJWT,
        // adminRole,
        check('id' , 'No es un ID Válido').isMongoId(),
        validarCampos
    ],
    tiposDelete)

module.exports = router;