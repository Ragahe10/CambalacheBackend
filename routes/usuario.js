const {Router} = require('express');
const {check} = require('express-validator');
const { usuariosGet, usuariosActivosGet, usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario');
const { esRolValido, emailExiste, usuarioExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', usuariosGet);

router.get('/activos', usuariosActivosGet);

router.get('/:id', usuarioGet);

router.post('/',
    [
        check ('nombre' , "El nombre es obligatorio").notEmpty(),
        check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({min:6}),
        check('correo').custom(emailExiste),
        check('rol').custom(esRolValido),
        validarCampos
    ],
    usuarioPost);

router.put('/:id',
    [
        validarJWT,
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(usuarioExiste),
        check('rol').custom(esRolValido),
        validarCampos
    ] ,
    usuarioPut);

router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id' , 'No es un ID Válido').isMongoId(),
        check('id').custom(usuarioExiste),
        validarCampos
    ] ,
    usuarioDelete);

module.exports = router;

