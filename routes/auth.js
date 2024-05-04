const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar_campos');
const { login, forgotPassword, createPassword } = require('../controllers/auth');
const { emailExiste } = require('../helpers/db-validators');

const router = Router();

router.post('/login',
    [
        check('correo', 'El correo no es valido').isEmail(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        validarCampos
    ],
    login
);

router.put('/Forgot-password',
    [
        check('correo', 'El correo es requerido').notEmpty(),
        validarCampos
    ],forgotPassword);

router.put('/new-password',
    [
        check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    createPassword);

module.exports = router;