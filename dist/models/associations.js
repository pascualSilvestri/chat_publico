"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_model_1 = __importDefault(require("./Message.model"));
const User_model_1 = __importDefault(require("./User.model"));
User_model_1.default.hasMany(Message_model_1.default, { as: 'messages', foreignKey: 'userId' });
Message_model_1.default.belongsTo(User_model_1.default, { as: 'user', foreignKey: 'userId' });
// Sincronizar las tablas
const models = [
    User_model_1.default,
    Message_model_1.default,
];
// Sincroniza todos los modelos
Promise.all(models.map((model) => model.sync({ alter: true })))
    .then(() => {
    console.log("Base de datos sincronizada.");
})
    .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
});
