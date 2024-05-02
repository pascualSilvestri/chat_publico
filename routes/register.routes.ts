import { Router } from "express";
import RegisterController from "../controller/register.controller";

const router = Router();

const controller: RegisterController = new RegisterController();

router.get('/', controller.index)
router.post('/', controller.register)


export default router