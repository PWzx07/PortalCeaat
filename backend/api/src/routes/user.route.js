import { Router } from "express";
import userController from "../controller/user.controller.js"

const router = Router();

router.get("/", userController.getUserController);
router.get("/:id", userController.filterUserController);
router.post("/registrar", userController.createUserController);
router.put("/atualizar/:id", userController.updateUserController);
router.delete("/deletar/:id", userController.deleteUserController);

export default router; 