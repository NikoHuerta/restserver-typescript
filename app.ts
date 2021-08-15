import dotenv from 'dotenv';
import Server from './models/server';

//config dot.env
dotenv.config();


const server = new Server();

server.listen();