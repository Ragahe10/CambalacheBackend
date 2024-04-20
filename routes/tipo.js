const { Router } = require('express');
const { tiposPost, tiposGet, tipoGet, tiposPut, tiposDelete } = require('../controllers/tipo');


const router = Router();

router.get('/:id', tipoGet)
router.get('/', tiposGet)
router.post('/', tiposPost)
router.put('/:id', tiposPut)
router.delete('/:id', tiposDelete)

module.exports = router;