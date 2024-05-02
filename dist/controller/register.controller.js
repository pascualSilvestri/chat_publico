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
const User_model_1 = __importDefault(require("../models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class RegisterController {
    index(req, res) {
        res.sendFile(process.cwd() + "/cliente/register.html");
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const pass = yield bcrypt_1.default.hash(body.password, 10);
            const user = yield User_model_1.default.create({
                nombre: body.nombre,
                usuario: body.usuario,
                password: pass
            });
            res.json(user);
        });
    }
}
exports.default = RegisterController;
