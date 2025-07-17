import { Router } from "express";
import authController from "../controllers/authController.js";
import middlewares from "../middlewares/middlewares.js";

const router = Router();

router.post("/auth/login",middlewares.validateAuthParameters, authController.login)

router.post("/auth/register",middlewares.validateAuthParameters, authController.register);

export default router;