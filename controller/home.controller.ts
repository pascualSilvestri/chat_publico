import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.model";



class HomeController{
    public index(req: Request, res: Response) {
        
        res.sendFile( process.cwd() + "/cliente/index.html");
    }
}


export default HomeController;