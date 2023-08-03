import { validatorHandler } from "../middlewares/validator.middleware";
import { login, logout, register } from "../controllers/auth.controller";
import { Router } from "express";
import { registerUserSchema } from "../schemas/register.schema";
import { loginUserSchema } from "../schemas/login.schema";

const router = Router();
router.post(
  "/register",
  validatorHandler(registerUserSchema, "body"),
  register
);
router.post("/login", validatorHandler(loginUserSchema, "body"), login);
router.post("/logout", logout);

export default router;
