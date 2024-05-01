import { Router } from "express";
import ChatController from "../controller/chat.controller";

const router = Router();

const controller: ChatController = new ChatController();

router.get('/', controller.index)


export default router