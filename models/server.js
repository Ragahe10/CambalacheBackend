const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // // this.{modelo}Path = '/api/{modelo}
        this.usuariosPath = '/api/usuario'
        this.productosPath = '/api/producto'
        this.paquetePath = '/api/paquete'
        this.ventaPath = '/api/venta'
        this.carritoPath = '/api/carrito'
        this.favoritoPath = '/api/favorito'

        // Conectar con la base de datos
        this.connectDB();

        // Middlewaares
        this.middlewares();

        // Funciones de rutas
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Leer lo que envia el usuario por el cuerpo de la petición
        this.app.use(express.json());

        // Definir la carpeta pública
        this.app.use(express.static('public'));
    }

    routes(){
        // this.app.use(this.{modelo}Path, require('../routes/{modelo})) vincula con el archivo en la carpeta routes
        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.productosPath, require('../routes/producto'));
        this.app.use(this.paquetePath, require('../routes/paquete'));
        this.app.use(this.ventaPath, require('../routes/venta'));
        this.app.use(this.carritoPath, require('../routes/carrito'));
        this.app.use(this.favoritoPath, require('../routes/favorito'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server online port: ', this.port);
        })
    }
}

module.exports = Server;