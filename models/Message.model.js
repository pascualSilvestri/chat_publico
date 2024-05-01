"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
class Message extends sequelize_1.Model {
}
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: { type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: db_1.default,
    tableName: "message",
    timestamps: true
});
exports.default = Message;
