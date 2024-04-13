const {Router} = require('express');
const { usuariosGet, usuariosActivosGet, usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario');

const router = Router();

router.get('/', usuariosGet);

router.get('/activos', usuariosActivosGet);

router.get('/:id', usuarioGet);

router.post('/', usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/:id', usuarioDelete);

module.exports = router;

