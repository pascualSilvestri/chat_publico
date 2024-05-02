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
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const generateJWT_1 = __importDefault(require("../helpers/generateJWT"));
const rols_model_1 = __importDefault(require("../models/rols.model"));
const domicilio_model_1 = __importDefault(require("../models/domicilio.model"));
const institucion_model_1 = __importDefault(require("../models/institucion.model"));
const usuarioRolInstitucionn_1 = __importDefault(require("../models/usuarioRolInstitucionn"));
const sequelize_1 = require("sequelize");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dni, password } = req.body;
                const usuario = yield usuario_model_1.default.findOne({
                    where: {
                        dni
                    },
                    include: [
                        {
                            model: domicilio_model_1.default,
                            as: 'domicilioUsuario'
                        },
                        {
                            model: institucion_model_1.default,
                            as: 'Instituciones', // Asegúrate de que este alias coincide con el que definiste en tus relaciones
                            through: { attributes: [] },
                            include: [{
                                    model: domicilio_model_1.default,
                                    as: 'domicilioInstitucion'
                                }] // Esto es para evitar que Sequelize incluya los atributos de la tabla de unión en los resultados
                        },
                    ]
                });
                if (!usuario) {
                    return res.status(404).json({
                        error: "Usuario invalidos"
                    });
                }
                const validPassword = yield bcrypt_1.default.compare(password, usuario.password);
                if (!validPassword) {
                    return res.status(404).json({
                        error: "Contraseña inválido"
                    });
                }
                const token = yield (0, generateJWT_1.default)();
                for (let institucion of usuario.Instituciones) {
                    const rolesInInstitucion = yield usuarioRolInstitucionn_1.default.findAll({
                        where: {
                            usuarioId: usuario.id,
                            institucionId: institucion.id,
                            rolId: { [sequelize_1.Op.not]: null }
                        },
                        include: [{
                                model: rols_model_1.default,
                                as: 'Roles',
                                where: {
                                    name: 'Admin'
                                }
                            }]
                    });
                    const roles = rolesInInstitucion.map(role => {
                        return {
                            id: role.Roles.id,
                            name: role.Roles.name
                        };
                    });
                    // Agregar los roles a la institución
                    usuario.dataValues.Roles = roles;
                }
                return res.json({
                    "user": usuario,
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
