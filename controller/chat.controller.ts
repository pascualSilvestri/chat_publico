import { Request, Response } from "express";


class ChatController{
    public index(req: Request, res: Response) {
        
        res.send('Hello, world!');
    }
}


export default ChatController;