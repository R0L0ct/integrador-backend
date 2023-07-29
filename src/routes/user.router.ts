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
const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.post("/", validatorHandler(createUserSchema, "body"), createUser);

router.patch("/:id", validatorHandler(updateUserSchema, "body"), updateUser);

router.delete("/:id", deleteUser);

export default router;
