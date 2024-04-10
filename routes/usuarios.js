const {Router} = require('express');
const { usuariosGet, usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.get('/:id', usuarioGet);

router.post('/', usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/:id', usuarioDelete);

module.exports = router;

