import { validatorHandler } from "../middlewares/validator.middleware";
import {
  createUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controller";
import express from "express";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { isAuthenticated } from "../middlewares/authentication.middleware";
const router = express.Router();

router.get("/", isAuthenticated, getAllUsers);

router.get("/:id", isAuthenticated, getUser);

router.post("/", validatorHandler(createUserSchema, "body"), createUser);

router.patch("/:id", validatorHandler(updateUserSchema, "body"), updateUser);

router.delete("/:id", isAuthenticated, deleteUser);

export default router;
