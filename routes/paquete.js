const express = require('express');
const {paquetesActivosGet, paquetesGet, paqueteGet, paquetePost, paquetePut, paqueteDelete} = require('../controllers/paquete');
const router = express.Router();

//Rutas para CRUD

router.get('/activos', paquetesActivosGet);

router.get('/', paquetesGet);

router.get('/:id', paqueteGet);

router.post('/', paquetePost);

router.put('/:id', paquetePut);

router.delete('/:id', paqueteDelete);

module.exports = router;
