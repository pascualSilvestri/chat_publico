import { Request, Response } from "express";
import bcrypt from "bcrypt";

import generateToken from "../helpers/generateJWT";
import jwt, { JwtPayload } from "jsonwebtoken";

import { Op } from "sequelize";
import User from "../models/User.model";

class AuthController {

    public async login(req: Request, res: Response) {
        const { body } = req;

        const pass = await body.password;

        const user = await User.findOne({
            where: {
                usuario: body.usuario,
            }
        })

        if (!user) {
            return res.status(400).json({
                message: "Usuario no encontrado"
            });
        }

        const validPassword = await bcrypt.compare(pass, user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Contraseña incorrecta"
            });
        }

        res.status(200).json(user);

    }




}

export default AuthController
