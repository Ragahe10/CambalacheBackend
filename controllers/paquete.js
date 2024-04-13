const { response, request } = require('express');
const Paquete = require('../models/paquete');

const paquetesActivosGet = async (req=request, res=response) =>{
    const data = req.query;
    const query = {estado: true};

    const [total, paquetes] = await Promise.all([
        Paquete.countDocuments(query),
        Paquete.find(query)
    ]);
    
    res.json({
        mensaje: "Paquetes obtenidosss",
        total,
        paquetes
    });
}
const paquetesGet = async (req=request, res=response) =>{
    const data = req.query;
    const [total, paquetes] = await Promise.all([
        Paquete.countDocuments(),
        Paquete.find()
    ]);

    res.json({
        mensaje: "Paquetes obtenidos",
        total,
        paquetes
    });
}
const paqueteGet = async (req=request, res=response) => {
    const {id} = req.params;

    const paquete = await Paquete.findById(id);

    res.json({
        mensaje: "Paquetes obtenidos",
        paquete
    });
}

const paquetePost = async (req=request, res=response) => {
    // middlewares
    const nombreDB = req.body.nombre.toUpperCase();
    const paqueteDB = await Paquete.findOne({nombreDB});
    if(paqueteDB){
        res.status(400).json({msg: `El nombre de paquete ya existe`});
    }
    // fin middlewares
    const {nombre, descripcion, precio} = req.body;
    const paquete = new Paquete({nombre, descripcion, precio});

    await paquete.save();
    
    res.json({
        mensaje: "Paquete creado",
        paquete
    })
}

const paquetePut = async (req=request, res=response) => {
    const id = req.params.id; 
    

    const paquete = await Paquete.findByIdAndUpdate(id, req.body, {new: true});
    
    res.json({
        mensaje: "se actualizó el paquete",
        paquete
    });
}

const paqueteDelete = async (req=request, res=response) => {
    try {
        const id = req.params.id;
        const paquete = await Paquete.findByIdAndDelete(id);
        if (!paquete) {
            return res.status(404).json({ mensaje: 'Paquete no encontrado' });
        }
        res.json({ mensaje: 'Paquete eliminado correctamente', paquete });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el paquete' });
    }
}

module.exports = {
    paquetesActivosGet,
    paquetesGet,
    paqueteGet,
    paquetePost,
    paquetePut,
    paqueteDelete
}
