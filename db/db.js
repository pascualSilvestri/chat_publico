"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
let db;
////////////////Develop Postgres Local/////////////////////
// const db_name: string = process.env.DB_NAME || 'postgres';
// const user: string = process.env.DB_USER || 'postgres';
// const password: string = process.env.DB_PASSWORD || '1234';
// const host: string = process.env.DB_HOST || 'localhost';
// const port: number = 5432;
///////////////////Railway Dev////////////////////////
const db_name = process.env.DB_NAME || 'railway';
const user = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || 'VPvmipDJfUjWOGQurornxVqHTDRWoVqS';
const host = process.env.DB_HOST || 'viaduct.proxy.rlwy.net';
const port = 42931;
try {
    db = new sequelize_1.Sequelize(db_name, user, password, {
        host, port, dialect: 'postgres',
        dialectOptions: {
            useUTC: false, // Add this line. for reading from database
        },
        timezone: "+05:30"
    });
}
catch (error) {
    throw new Error("No se pudo conectar con la base de datos" + error);
}
exports.default = db;
