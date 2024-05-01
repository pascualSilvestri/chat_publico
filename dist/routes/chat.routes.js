"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("../controller/chat.controller"));
const router = (0, express_1.Router)();
const controller = new chat_controller_1.default();
router.get('/', controller.index);
exports.default = router;
