"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_routes_1 = __importDefault(require("../routes/chat.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const home_routes_1 = __importDefault(require("../routes/home.routes"));
const morgan_1 = __importDefault(require("morgan"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
const cors_1 = __importDefault(require("cors"));
const Message_model_1 = __importDefault(require("../models/Message.model"));
const register_routes_1 = __importDefault(require("../routes/register.routes"));
const User_model_1 = __importDefault(require("../models/User.model"));
class MyServer {
    constructor() {
        this.apiPaths = {
            home: '/',
            register: '/register',
            chat: "/chat",
            auth: '/login'
        };
        this.app = (0, express_1.default)();
        this.server = (0, node_http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server);
        this.port = process.env.PORT || "3001";
        this.app.use((0, morgan_1.default)("dev"));
        this.initDB();
        this.middlewares();
        this.sync();
        this.routes();
        this.ioConnet();
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.sync({ alter: true });
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static(process.cwd() + "/cliente"));
        const corsOptions = {
            credentials: true,
            origin: "*",
        };
        this.app.use((0, cors_1.default)(corsOptions));
        // this.app.use((req, res, next) => {
        //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Reemplaza con el dominio de tu aplicación
        //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        //     next();
        //   })
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log("Server running at", this.port);
        });
    }
    ioConnet() {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
                console.log(`'a user connected', ${socket.id}`);
                socket.on("disconnect", () => {
                    console.log("user disconnected");
                });
                socket.on("chat message", (msg) => __awaiter(this, void 0, void 0, function* () {
                    const userId = socket.handshake.auth.user.id;
                    const message = yield Message_model_1.default.create({
                        message: msg,
                        userId: userId,
                    });
                    this.io.emit("chat message", msg, message.id);
                }));
                if (!socket.recovered) {
                    try {
                        const messages = yield Message_model_1.default.findAll({
                            where: {
                                id: {
                                    [sequelize_1.Op.gt]: socket.handshake.auth.serverOffSet
                                }
                            },
                            include: {
                                model: User_model_1.default,
                                as: 'user'
                            }
                        });
                        // socket.emit("chat message", messages, messages.length-1);
                        messages.forEach((message) => {
                            socket.emit("chat message", message.message, message.id, message.user);
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }));
        });
    }
    initDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.authenticate();
                console.log("Database Online");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    routes() {
        this.app.use(this.apiPaths.chat, chat_routes_1.default);
        this.app.use(this.apiPaths.auth, auth_routes_1.default);
        this.app.use(this.apiPaths.register, register_routes_1.default);
        this.app.use(this.apiPaths.home, home_routes_1.default);
    }
}
exports.default = MyServer;
