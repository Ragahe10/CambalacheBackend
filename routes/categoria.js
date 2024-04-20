const { Router } = require('express');
const { categoriasPost, categoriaGet, categoriasGet, categoriasPut, categoriasDelete } = require('../controllers/categoria');


const router = Router();

router.get('/:id', categoriaGet)
router.get('/', categoriasGet)
router.post('/', categoriasPost)
router.put('/:id', categoriasPut)
router.delete('/:id', categoriasDelete)

module.exports = router;
