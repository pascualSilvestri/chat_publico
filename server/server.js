"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_routes_1 = __importDefault(require("../routes/chat.routes"));
class Server {
    constructor() {
        this.apiPaths = {
            chat: "/chat",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3001";
        this.routes();
    }
    middlewares() {
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running at", this.port);
        });
    }
    routes() {
        this.app.use(this.apiPaths.chat, chat_routes_1.default);
    }
}
exports.default = Server;
