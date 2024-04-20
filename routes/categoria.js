const { Router } = require('express');
const { categoriasPost, categoriaGet, categoriasGet, categoriasPut, categoriasDelete } = require('../controllers/categoria');
const { validarCampos } = require('../middlewares/validar_campos');
const { check } = require('express-validator');
const { categoriaExiste } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { adminRole } = require('../middlewares/validar-usuario');



const router = Router();

router.get('/:id',
    [
        check('id' , 'No es un ID Válido').isMongoId(),
        validarCampos
    ],
    categoriaGet)

router.get('/', categoriasGet)

router.post('/',
    [
        validarJWT,
        adminRole,
        check('categoria',' el nombre es obligatorio').notEmpty(),
        check('categoria').custom(categoriaExiste),
        validarCampos
    ],
    categoriasPost)

router.put('/:id',
    [
        validarJWT,
        adminRole,
        check('id' , 'No es un ID Válido').isMongoId(),
        check('categoria',' el nombre es obligatorio').notEmpty(),
        check('categoria').custom(categoriaExiste),
        validarCampos
    ],
    categoriasPut)

router.delete('/:id',
    [
        validarJWT,
        adminRole,        
        check('id' , 'No es un ID Válido').isMongoId(),
        validarCampos
    ],
    categoriasDelete)

module.exports = router;
