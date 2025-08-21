import { Router } from "express";
import middlewares from "../middlewares/middlewares";

const router = Router();

router.get("/users", middlewares.validateToken, middlewares.isAdmin,);
router.get("/users/:id", middlewares.validateToken, middlewares.isAdmin, middlewares.validateID,);
router.post("/users/add", middlewares.validateToken, middlewares.isAdmin, "crear middlewares para validar users body",);
router.put("/users/update/:id", middlewares.validateToken, middlewares.isAdmin, middlewares.validateID, "crear middlewares para validar body users",);
router.delete("/users/delete/:id", middlewares.validateToken, middlewares.validateID,);

export default router;