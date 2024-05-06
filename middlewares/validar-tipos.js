const Tipo = require('../models/tipo');

const esTipoValido = async (req, res, next) => {
    const tipo = req.body.tipo.toUpperCase();
    const existeTipo = await Tipo.findOne({tipo});
    if(!existeTipo){
        return res.status(401).json({
            msg:`El tipo ${tipo} no existe en la base de datos`});
    }
    next();
}
//validar Tipo
const tipoExiste = async (req, res, next) => {
    const tipo = req.body.tipo.toUpperCase();
    const existeTipo = await Tipo.findOne({tipo});

    if(existeTipo){
        return res.status(401).json({
            msg:`EL tipo ${tipo} ya está registrado`});
    }
    next();
}

module.exports = {
    esTipoValido,
    tipoExiste
}