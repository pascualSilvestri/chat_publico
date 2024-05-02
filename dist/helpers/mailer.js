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
// mailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
class Mailer {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'pascualsilvestri14@gmail.com',
                pass: 'ggvz nqhj gtfo jpyo'
            }
        });
    }
    sendVerificationCode(email, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let mailOptions = {
                from: 'pascualsilvestri14@gmail.com',
                to: email,
                subject: 'Código de verificación',
                text: `Tu código de verificación es ${code}`
            };
            try {
                yield this.transporter.sendMail(mailOptions);
                console.log('Correo electrónico enviado a ' + email);
            }
            catch (error) {
                console.error('Error al enviar el correo electrónico: ', error);
            }
        });
    }
}
exports.default = new Mailer();
