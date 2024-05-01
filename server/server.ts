import express from "express";
import chatRouter from "../routes/chat.routes";
import logger from "morgan";
import { Server as IOServer } from "socket.io";
import { createServer } from "node:http";
import db from "../db/db";
import { Op } from "sequelize"; 
import cors from "cors";
import Message from "../models/Message.model";

class MyServer {
  private app: express.Application;
  private port: string;
  private io: IOServer;
  private server: any;

  private apiPaths = {
    chat: "/chat",
  };

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new IOServer(this.server);
    this.port = process.env.PORT || "3001";
    this.app.use(logger("dev"));
    this.initDB();
    this.middlewares();
    this.sync();
    this.routes();
    this.ioConnet();
  }

  async sync() {
    await db.sync({ alter: true });
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(process.cwd() + "/cliente"));
    const corsOptions = {
      credentials: true,
      origin: "*",
    };
    this.app.use(cors(corsOptions));
    // this.app.use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100'); // Reemplaza con el dominio de tu aplicación
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    //     next();
    //   })
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log("Server running at", this.port);
    });
  }

  public async ioConnet() {
    this.io.on("connection", async (socket) => {
      console.log(`'a user connected', ${socket.id}`);

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("chat message", async (msg) => {
        const message = await Message.create({
          message: msg
        });
        this.io.emit("chat message", msg, message.id);
      });

      if(!socket.recovered){
        try{
          const messages = await Message.findAll({
            where:{
              id: {
                [Op.gt]: socket.handshake.auth.serverOffSet
              }
            }
          });
  
          messages.forEach((message) => {
            this.io.emit("chat message", message.message, message.id);
          });

        }catch(e){
          console.log(e);
        }
        
        
      }
    });

  }

  private async initDB() {
    try {
      await db.authenticate();
      console.log("Database Online");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  routes() {
    this.app.use(this.apiPaths.chat, chatRouter);
  }
}

export default MyServer;
