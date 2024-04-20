const express = require('express');
const {carritoGet, carritoPost, carritoPut, carritoDelete,} = require('../controllers/carrito');
const router = express.Router();

//Rutas para CRUD

router.get('/:id', carritoGet);

router.post('/', carritoPost);

router.put('/:id', carritoPut);

router.delete('/:id', carritoDelete);

module.exports = router;
