import { validatorHandler } from "../middlewares/validator.middleware";
import {
  createUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
  // getUserBySessionToken,
} from "../controllers/user.controller";
import express from "express";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import {
  checkAdminSession,
  checkSession,
} from "../middlewares/session.middleware";
const router = express.Router();

/**
 * @swagger
 * /api/v1/user:
 *  get:
 *    summary: get all users
 *    tags: [User]
 */
router.get("/", checkSession, getAllUsers);

// router.get("/isauth", getUserBySessionToken);

/**
 * @swagger
 * /api/v1/user/:id:
 *  get:
 *    summary: get a user
 *    tags: [User]
 */
router.get("/:id", checkSession, getUser);

/**
 * @swagger
 * /api/v1/user:
 *  post:
 *    summary: create a user
 *    tags: [User]
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
 *                description: es opcional , por defecto tiene el valor de customer
 *            required:
 *               - name
 *               - email
 *               - password
 *    responses:
 *      200:
 *        description: new user created
 */
router.post("/", validatorHandler(createUserSchema, "body"), createUser);

/**
 * @swagger
 * /api/v1/user/:id:
 *  patch:
 *    summary: update a user
 *    tags: [User]
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
 *    responses:
 *      200:
 *        description: user updated
 */
router.patch(
  "/:id",
  checkAdminSession,
  validatorHandler(updateUserSchema, "body"),
  updateUser
);

/**
 * @swagger
 * /api/v1/user/:id:
 *  delete:
 *    summary: delete a user
 *    tags: [User]
 */
router.delete("/:id", checkAdminSession, deleteUser);

export default router;
