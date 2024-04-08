const { Router } = require('express');
const {paquetesActivosGet, paquetesGet, paqueteGet, paquetePost, paquetePut, paqueteDelete} = require('../controllers/paquete');
const router = Router();

//Rutas para CRUD

router.get('/', paquetesActivosGet);

router.get('/', paquetesGet);

router.get('/:id', paqueteGet);

router.post('/', paquetePost);

router.put('/:id', paquetePut);

router.delete('/:id', paqueteDelete);

module.exports = router;
