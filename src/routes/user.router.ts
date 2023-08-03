import { validatorHandler } from "../middlewares/validator.middleware";
import {
  createUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
  getUserBySessionToken,
} from "../controllers/user.controller";
import express from "express";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { checkSession } from "../middlewares/session.middleware";
const router = express.Router();

router.get("/", checkSession, getAllUsers);
router.get("/isauth", getUserBySessionToken);

router.get("/:id", checkSession, getUser);

router.post("/", validatorHandler(createUserSchema, "body"), createUser);

router.patch("/:id", validatorHandler(updateUserSchema, "body"), updateUser);

router.delete("/:id", checkSession, deleteUser);

export default router;
