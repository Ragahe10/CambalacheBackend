const {Router} = require('express');
const {check} = require('express-validator');
const { usuariosGet, usuariosActivosGet, usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario');
const { esRolValido, usuarioExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { usuarioPermitidoUD, adminRole, emailExiste } = require('../middlewares/validar-usuario');

const router = Router();

router.get('/',
    [
        // validarJWT,
        // adminRole,
        validarCampos
    ],
    usuariosGet);

router.get('/activos', usuariosActivosGet);

router.get('/:id',
    [
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(usuarioExiste),
    ],
    usuarioGet);

router.post('/',
    [
        check ('nombre' , "El nombre es obligatorio").notEmpty(),
        check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({min:6}),
        emailExiste,
        validarCampos
    ],
    usuarioPost);

router.put('/:id',
    [
        // validarJWT,
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(usuarioExiste),
        usuarioPermitidoUD,
        validarCampos
    ] ,
    usuarioPut);

router.delete('/:id',
    [
        // validarJWT,
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(usuarioExiste),
        usuarioPermitidoUD,
        validarCampos
    ] ,
    usuarioDelete);

module.exports = router;

