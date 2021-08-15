import express, { Application } from 'express';

import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';


class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';


        this.dbConnection();        
        //middlewares
        this.middlewares();
        //Definir mis rutas
        this.routes();

    }

    //TODO: conectar BD

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('DataBase ready');

        }catch(err){
            throw new Error(err);
        }
    }


    middlewares(){

        //CORS
        this.app.use( cors() );

        //LECTURA DEL BODY
        this.app.use(express.json());

        //carpeta publica
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto !: ${this.port}`);
        });
    }
}


export default Server;