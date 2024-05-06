const Categoria = require('../models/categoria');

// validar categoria
const categoriaExiste = async (req, res, next) => {
    const categoria = req.body.categoria.toUpperCase();
    const existeCategoria = await Categoria.findOne({categoria});

    if(existeCategoria){
        return res.status(401).json({
            mgs: `la categoría ${categoria} ya está registrada`});
    }
    next();
}

// validar categoria
const esCategoriaValido = async (req, res, next) => {
    const categoria = req.body.categoria.toUpperCase();
    const existeCategoria = await Categoria.findOne({categoria});

    if(!existeCategoria){
        return res.status(401).json({
            msg: `La categoria ${categoria} no existe en la base de datos`});
    }
    next();
}

module.exports = {
    categoriaExiste,
    esCategoriaValido
}