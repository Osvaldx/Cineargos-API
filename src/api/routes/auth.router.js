import { Router } from "express";
import authController from "../controllers/authController.js";
import middlewares from "../middlewares/middlewares.js";

const router = Router();

router.post("/auth",middlewares.validateAuthParameters, authController.login)

export default router;