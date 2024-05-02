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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../models/User.model"));
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const pass = yield body.password;
            const user = yield User_model_1.default.findOne({
                where: {
                    usuario: body.usuario,
                }
            });
            if (!user) {
                return res.status(400).json({
                    message: "Usuario no encontrado"
                });
            }
            const validPassword = yield bcrypt_1.default.compare(pass, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    message: "Contraseña incorrecta"
                });
            }
            return res.status(200).json(user);
        });
    }
}
exports.default = AuthController;
