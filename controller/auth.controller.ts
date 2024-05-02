import { Request, Response } from "express";
import bcrypt from "bcrypt";

import generateToken from "../helpers/generateJWT";
import jwt, { JwtPayload } from "jsonwebtoken";

import { Op } from "sequelize";
import User from "../models/User.model";

class AuthController {

    public async login(req: Request, res: Response) {

        try {

            const { dni, password } = req.body

            const user = await User.findOne({
                where: {
                    dni
                },
            });
            
        
            if (!user) {
                return res.status(404).json({
                    error: "user invalidos"
                })
            }



            const validPassword = await bcrypt.compare(password, user.password);


            if (!validPassword) {
                return res.status(404).json({
                    error: "Contraseña inválido"
                })
            }

            const token = await generateToken();



            return res.json({
                "user": user,
                "token": token
            })


        } catch (error) {
            return res.status(404).json({
                msg: `"Error al generar token " ${error}`
            })
        }

    }




}

export default AuthController
