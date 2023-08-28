import express from "express";
import { validatorHandler } from "../middlewares/validator.middleware";
import {
  createInventorySchema,
  createProductSchema,
  updateInventorySchema,
  updateProductSchema,
} from "../schemas/product.schema";
import {
  createInventoryItem,
  createNewProduct,
  deleteInventoryItem,
  deleteProduct,
  getAllInventory,
  getAllProducts,
  getProduct,
  updateInventoryItem,
  updateProduct,
} from "../controllers/product.controller";
import { checkAdminSession } from "../middlewares/session.middleware";
const router = express.Router();

/**
 * @swagger
 * /api/v1/product:
 *  post:
 *    summary: create a product
 *    tags: [Product]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              image:
 *                type: string
 *              description:
 *                type: string
 *              price:
 *                type: integer
 *              categoryId:
 *                type: string
 *              recommended:
 *                type: boolean
 *            required:
 *               - name
 *               - image
 *               - description
 *               - price
 *               - recommended
 *    responses:
 *      200:
 *        description: product created
 */
router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  createNewProduct
);

/**
 * @swagger
 * /api/v1/product/inventory:
 *  get:
 *    summary: get all inventories
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: inventories geted
 */
router.get("/inventory", getAllInventory);

/**
 * @swagger
 * /api/v1/product:
 *  get:
 *    summary: get all products
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: products geted
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /api/v1/product/:id:
 *  get:
 *    summary: get a product
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: product geted
 */
router.get("/:id", getProduct);

/**
 * @swagger
 * /api/v1/product/:id:
 *  patch:
 *    summary: update a product
 *    tags: [Product]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              image:
 *                type: string
 *              description:
 *                type: string
 *              price:
 *                type: integer
 *              recommended:
 *                type: boolean
 *    responses:
 *      200:
 *        description: product updated
 */
router.patch(
  "/:id",
  checkAdminSession,
  validatorHandler(updateProductSchema, "body"),
  updateProduct
);

/**
 * @swagger
 * /api/v1/product/:id:
 *  delete:
 *    summary: delete a product
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: product deleted
 */
router.delete("/:id", deleteProduct);

/**
 * @swagger
 * /api/v1/product/inventory:
 *  post:
 *    summary: create an inventory
 *    tags: [Product]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              size:
 *                type: string
 *              stock:
 *                type: integer
 *              productId:
 *                type: string
 *            required:
 *               - size
 *               - stock
 *               - productId
 *    responses:
 *      200:
 *        description: inventory created
 */
router.post(
  "/inventory",
  validatorHandler(createInventorySchema, "body"),
  createInventoryItem
);

/**
 * @swagger
 * /api/v1/product/inventory/:id:
 *  patch:
 *    summary: update an inventory
 *    tags: [Product]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              size:
 *                type: string
 *              stock:
 *                type: integer
 *    responses:
 *      200:
 *        description: inventory updated
 */
router.patch(
  "/inventory/:id",
  validatorHandler(updateInventorySchema, "body"),
  updateInventoryItem
);

/**
 * @swagger
 * /api/v1/product/inventory/:id:
 *  delete:
 *    summary: delete an inventory
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: inventory deleted
 */
router.delete("/inventory/:id", deleteInventoryItem);

export default router;
