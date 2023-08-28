import { validatorHandler } from "../middlewares/validator.middleware";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller";
import { Router } from "express";
import { registerUserSchema } from "../schemas/register.schema";
import { loginUserSchema } from "../schemas/login.schema";
import { refreshTokenMid } from "../middlewares/session.middleware";

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: register new user
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              role:
 *                type: string
 *                description: por defecto tiene el valor de customer
 *            required:
 *               - name
 *               - email
 *               - password
 *    responses:
 *      200:
 *        description: user registered
 */
router.post(
  "/register",
  validatorHandler(registerUserSchema, "body"),
  register
);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: login
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *               - email
 *               - password
 *    responses:
 *      200:
 *        description: logged
 */
router.post("/login", validatorHandler(loginUserSchema, "body"), login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *  post:
 *    summary: logout
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: logout
 */
router.post("/logout", logout);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *  post:
 *    summary: refresh token
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: token refreshed
 */
router.post("/refresh", refreshTokenMid, refreshToken);

export default router;
