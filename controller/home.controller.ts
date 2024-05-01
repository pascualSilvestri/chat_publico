import { Request, Response } from "express";


class HomeController{
    public index(req: Request, res: Response) {
        
        res.sendFile( process.cwd() + "/cliente/index.html");
    }
}


export default HomeController;