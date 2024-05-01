import { Request, Response } from "express";


class ChatController{
    public index(req: Request, res: Response) {
        
        res.sendFile( process.cwd() + "/cliente/index.html");
    }
}


export default ChatController;