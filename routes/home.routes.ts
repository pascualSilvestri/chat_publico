import { Router } from "express";
import ChatController from "../controller/chat.controller";
import HomeController from "../controller/home.controller";

const router = Router();

const controller: HomeController = new HomeController();

router.get('/', controller.index)

router.post('/login', controller.login)



export default router