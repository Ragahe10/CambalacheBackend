const { Router } = require('express');
const { productosPost, productosGet, productosActivosGet, productoGet, productosPut, productosDelete } = require('../controllers/producto');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const { adminRole } = require('../middlewares/validar-usuario');
const { nombreProductoExiste, esTipoValido, productoExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar_campos');


const router = Router();

router.get('/:id',
    [
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(productoExiste),
        validarCampos
    ],
    productoGet)

router.get('/',
    [
        validarJWT,
        adminRole
    ],
    productosGet)

router.get('/activos', productosActivosGet)

router.post('/',
    [
        validarJWT,
        adminRole,
        check('nombre').custom(nombreProductoExiste),
        check('descripcion','La descripción es obligatoria').notEmpty(),
        check('precio', 'El precio es obligatorio').notEmpty(),
        check('precio', 'El precio debe ser un valor numérico').isFloat({ min: 0 }),
        esTipoValido,
        validarCampos
    ],
    productosPost)

router.put('/:id',
    [
        validarJWT,
        adminRole,
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(productoExiste),
        check('nombre').custom(nombreProductoExiste),
        check('descripcion','La descripción es obligatoria').notEmpty(),
        check('precio', 'El precio es obligatorio').notEmpty(),
        check('precio', 'El precio debe ser un valor numérico').isFloat({ min: 0 }),
        esTipoValido,
        validarCampos
    ],
    productosPut)

router.delete('/:id',
    [
        validarJWT,
        adminRole,
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(productoExiste),
        validarCampos
    ],
    productosDelete)

module.exports = router;