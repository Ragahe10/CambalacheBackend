const { Router } = require('express');
const {ventasGet, ventasUsuarioGet,/* ventasFiltroGet, */ventasPost, ventaPut, ventaDelete} = require('../controllers/venta');
const router = Router();

//Rutas para CRUD

router.get('/', ventasGet);

router.get('/usuario/:idUsuario', ventasUsuarioGet);

// router.get('/filtro/', ventasFiltroGet);

router.post('/', ventasPost);

router.put('/:id', ventaPut);

router.delete('/:id', ventaDelete);

module.exports = router;