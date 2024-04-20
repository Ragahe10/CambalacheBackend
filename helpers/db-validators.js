const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const Producto = require('../models/producto');


//validar el email de usuario
const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo}) ;

    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra en la base de datos registrado`);
    }
}

//validar si el usuario existe
const usuarioExiste = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El id ${id} no corresponde a ningun usuario registrado`);
    }
}

// validar si el producto existe
const productoExiste = async (id) => {
    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`El id ${id} no corresponde a ningun producto registrado`);
    }
}

// Validar si el nombre del producto existe
const nombreProductoExiste = async (nombre) => {
    nombre = nombre.toUpperCase();
    const existeProducto = await Producto.findOne({ nombre });

    if (existeProducto) {
        throw new Error(`El nombre "${nombre}" ya está en uso.`);
    }
}

// validar categoria
const categoriaExiste = async (categoria) => {
    categoria = categoria.toUpperCase();
    const existeCategoria = await categoria.findOne({categoria});

    if(existeCategoria){
        throw new Error(`la categoría ${categoria} ya está registrada`);
    }
}

//validar Tipo
const tipoExiste = async (tipo) => {
    tipo = tipo.toUpperCase();
    const existeTipo = await Tipo.findOne({tipo});

    if(!existeTipo){
        throw new Error(`EL tipo ${tipo} ya está registrado`);
    }
}
// validar categoria
const esCategoriaValido = async (categoria) => {
    categoria = categoria.toUpperCase();
    const existeCategoria = await categoria.findOne({categoria});

    if(!existeCategoria){
        throw new Error(`La categoria ${categoria} no existe en la base de datos`);
    }
}

//validar rol
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol});

    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}

//validar Tipo
const esTipoValido = async (tipo) => {
    tipo = tipo.toUpperCase();
    const existeTipo = await Tipo.findOne({tipo});

    if(!existeTipo){
        throw new Error(`El tipo ${tipo} no existe en la base de datos`);
    }
}



module.exports = {
    emailExiste,
    usuarioExiste,
    productoExiste,
    nombreProductoExiste,
    categoriaExiste,
    tipoExiste,
    esCategoriaValido,
    esRolValido,
    esTipoValido
}