"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatController {
    index(req, res) {
        res.sendFile(process.cwd() + "/cliente/chat.html");
    }
}
exports.default = ChatController;
