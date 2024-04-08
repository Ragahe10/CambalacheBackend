const { Router } = require('express');
const {ventasGet, ventasPost, ventasPut, ventasDelete} = require('../controllers/venta');
const router = Router();

//Rutas para CRUD

router.get('/', ventasGet);

router.post('/', ventasPost);

router.put('/:id', ventasPut);

router.delete('/:id', ventasDelete);

module.exports = router;