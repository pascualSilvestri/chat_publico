import { Router } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();

const controller: AuthController = new AuthController()

router.post('/login', controller.login)


export default router