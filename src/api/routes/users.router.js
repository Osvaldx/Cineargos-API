import { Router } from "express";
import middlewares from "../middlewares/middlewares";
import { getAllUsers, getUser, addUser, updateUser, deletUser } from "../controllers/usersController.js";

const router = Router();

router.get("/users", middlewares.validateToken, middlewares.isAdmin, getAllUsers);
router.get("/users/:id", middlewares.validateToken, middlewares.isAdmin, middlewares.validateID, getUser);
router.post("/users/add", middlewares.validateToken, middlewares.isAdmin, "crear middlewares para validar users body", addUser);
router.put("/users/update/:id", middlewares.validateToken, middlewares.isAdmin, middlewares.validateID, "crear middlewares para validar body users", updateUser);
router.delete("/users/delete/:id", middlewares.validateToken, middlewares.validateID, deletUser);

export default router;