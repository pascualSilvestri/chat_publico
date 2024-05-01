import dotenv from 'dotenv';
import Server from "./server/server";

dotenv.config();
require('./models/associations');

const server = new Server();

server.listen();