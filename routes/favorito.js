const express = require('express');
const {favoritoGet, favoritoPost, favoritoPut, favoritoDelete,} = require('../controllers/favorito');
const router = express.Router();

//Rutas para CRUD

router.get('/:id', favoritoGet);

router.post('/', favoritoPost);

router.put('/:id', favoritoPut);

router.delete('/:id', favoritoDelete);

module.exports = router;
