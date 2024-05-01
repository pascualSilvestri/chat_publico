"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatController {
    index(req, res) {
        res.sendFile(process.cwd() + "/cliente/index.html");
    }
}
exports.default = ChatController;
