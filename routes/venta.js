const { Router } = require('express');
const {ventasGet, ventasPost, ventaPut, ventaDelete} = require('../controllers/venta');
const router = Router();

//Rutas para CRUD

router.get('/', ventasGet);

router.post('/', ventasPost);

router.put('/:id', ventaPut);

router.delete('/:id', ventaDelete);

module.exports = router;