const { Router } = require('express');
const { productosPost, productosGet, productoGet, productosPut, productosDelete } = require('../controllers/producto');


const router = Router();

router.get('/:id', productoGet)
router.get('/', productosGet)
router.post('/', productosPost)
router.put('/:id', productosPut)
router.delete('/:id', productosDelete)

module.exports = router;
