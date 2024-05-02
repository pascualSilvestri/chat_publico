import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcrypt";


class RegisterController{
    public index(req: Request, res: Response) {
        
        res.sendFile( process.cwd() + "/cliente/register.html");
    }

    public async register(req: Request, res: Response) {
        const { body } = req;

        const pass = await bcrypt.hash(body.password, 10)

        const user = await User.create({
            nombre: body.nombre,
            usuario: body.usuario,
            password:pass
        })

        res.json(user);
    }
}


export default RegisterController;