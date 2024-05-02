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
const generateJWT_1 = __importDefault(require("../helpers/generateJWT"));
const User_model_1 = __importDefault(require("../models/User.model"));
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dni, password } = req.body;
                const user = yield User_model_1.default.findOne({
                    where: {
                        dni
                    },
                });
                if (!user) {
                    return res.status(404).json({
                        error: "user invalidos"
                    });
                }
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!validPassword) {
                    return res.status(404).json({
                        error: "Contraseña inválido"
                    });
                }
                const token = yield (0, generateJWT_1.default)();
                return res.json({
                    "user": user,
                    "token": token
                });
            }
            catch (error) {
                return res.status(404).json({
                    msg: `"Error al generar token " ${error}`
                });
            }
        });
    }
}
exports.default = AuthController;
