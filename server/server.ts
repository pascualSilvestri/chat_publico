import express from "express";
import chatRouter from "../routes/chat.routes";

class Server {
  private app: express.Application;
  private port: string;

  private apiPaths = {
    chat: "/chat",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.routes();
  }

  middlewares() {
  
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server running at", this.port);
    });
  }

  routes() {
    this.app.use(this.apiPaths.chat, chatRouter);
  }
}

export default Server;


