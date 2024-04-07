const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // // this.{modelo}Path = '/api/{modelo}
        // this.ejemploPath = '/api/ejemplo'

        // Conectar con la base de datos
        this.connectDB();

        // Middlewaares
        this.middlewares();
        
        // Funciones de rutas
        // this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Leer lo que envia el usuario por el cuerpo de la petición
        this.app.use(express.json());

        // Definir la carpeta pública
        this.app.use(express.static('public'));
    }

    // routes(){
    //     // this.app.use(this.{modelo}Path, require('../routes/{modelo})) vincula con el archivo en la carpeta routes
    //     this.app.use(this.ejemploPath, require('../routes/ejemplo'))
    // }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server online port: ', this.port);
        })
    }
}

module.exports = Server;