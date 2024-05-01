import { Sequelize } from 'sequelize';

let db: Sequelize;

////////////////Develop Postgres Local/////////////////////

// const db_name: string = process.env.DB_NAME || 'postgres';
// const user: string = process.env.DB_USER || 'postgres';
// const password: string = process.env.DB_PASSWORD || '1234';
// const host: string = process.env.DB_HOST || 'localhost';
// const port: number = 5432;



///////////////////Railway Dev////////////////////////
const db_name: string = process.env.DB_NAME || 'railway';
const user: string = process.env.DB_USER || 'postgres';
const password: string = process.env.DB_PASSWORD || 'VPvmipDJfUjWOGQurornxVqHTDRWoVqS';
const host: string = process.env.DB_HOST || 'viaduct.proxy.rlwy.net';
const port: number = 42931;




try {
    db = new Sequelize(db_name, user, password, {
        host,port, dialect: 'postgres',
        dialectOptions: {
            useUTC: false, // Add this line. for reading from database
        },
        timezone: "+05:30"
    });  
} catch (error) {
    throw new Error("No se pudo conectar con la base de datos" + error)
}


export default db;     