import express from "express";
import { validatorHandler } from "../middlewares/validator.middleware";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
const router = express.Router();

/**
 * @swagger
 * /api/v1/category:
 *  post:
 *    summary: create a category
 *    tags: [Category]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *            required:
 *               - name
 *    responses:
 *      200:
 *        description: category created
 */
router.post(
  "/",
  validatorHandler(createCategorySchema, "body"),
  createNewCategory
);

/**
 * @swagger
 * /api/v1/category:
 *  get:
 *    summary: get all categories
 *    tags: [Category]
 *    responses:
 *      200:
 *        description: categories geted
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /api/v1/category/:id:
 *  get:
 *    summary: get a categoary
 *    tags: [Category]
 *    responses:
 *      200:
 *        description: category geted
 */
router.get("/:id", getCategory);

/**
 * @swagger
 * /api/v1/category/:id:
 *  patch:
 *    summary: update a category
 *    tags: [Category]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      200:
 *        description: category updated
 */
router.patch(
  "/:id",
  validatorHandler(updateCategorySchema, "body"),
  updateCategory
);

/**
 * @swagger
 * /api/v1/category/:id:
 *  delete:
 *    summary: delete a category
 *    tags: [Category]
 *    responses:
 *      200:
 *        description: category deleted
 */
router.delete("/:id", deleteCategory);

export default router;
