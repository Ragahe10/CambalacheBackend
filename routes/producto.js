const { Router } = require('express');
const { productosPost, productosGet, productosActivosGet, productoGet, productosPut, productosDelete, productosDeleteEstado } = require('../controllers/producto');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const { adminRole } = require('../middlewares/validar-usuario');
const { productoExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar_campos');
const { esTipoValido } = require('../middlewares/validar-tipos');
const { nombreProductoExiste } = require('../middlewares/validar-productos');


const router = Router();

router.get('/activos', productosActivosGet)

router.get('/:id',
    [
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(productoExiste),
        validarCampos
    ],
    productoGet)

router.get('/',productosGet)


router.post('/',
    [
        validarJWT,
        adminRole,
        nombreProductoExiste,
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
        nombreProductoExiste,
        check('descripcion','La descripción es obligatoria').notEmpty(),
        check('precio', 'El precio es obligatorio').notEmpty(),
        check('precio', 'El precio debe ser un valor numérico').isFloat({ min: 0 }),
        esTipoValido,
        validarCampos
    ],
    productosPut)

router.delete('/Estado/:id',
    [
        validarJWT,
        adminRole,
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(productoExiste),
        validarCampos
    ],
    productosDeleteEstado)
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