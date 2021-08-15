import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER || "";
const dbName = process.env.DB_NAME || "";
const dbHost = process.env.HOST || "";
const dbPort = process.env.DB_PORT;

const db = new Sequelize(dbName, dbUser, undefined , {
    host: dbHost,
    dialect: 'mariadb',
    port: Number(dbPort)
    //logging: false,
});


export default db;