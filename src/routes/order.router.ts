import {
  checkAdminSession,
  checkSession,
} from "../middlewares/session.middleware";
import {
  addItem,
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../controllers/order.controller";
import express from "express";
import { validatorHandler } from "../middlewares/validator.middleware";
import { createOrderSchema, updateOrderSchema } from "../schemas/order.schema";
import { addItemsSchema } from "../schemas/order-product.schema";
const router = express.Router();

/**
 * @swagger
 * /api/v1/order:
 *  get:
 *    summary: get all orders
 *    tags: [Order]
 *    responses:
 *      200:
 *        description: orders geted
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /api/v1/order/:id:
 *  get:
 *    summary: get an order
 *    tags: [Order]
 *    responses:
 *      200:
 *        description: order geted
 */
router.get("/:id", getOrder);
/**
 * @swagger
 * /api/v1/order:
 *  post:
 *    summary: create an order
 *    tags: [Order]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              total:
 *                type: integer
 *              status:
 *                type: string
 *              customerId:
 *                type: string
 *            required:
 *               - total
 *               - status
 *               - customerId
 *    responses:
 *      200:
 *        description: order created
 */
router.post(
  "/",
  checkSession,
  validatorHandler(createOrderSchema, "body"),
  createNewOrder
);

/**
 * @swagger
 * /api/v1/order/order-product:
 *  post:
 *    summary: create an order-product
 *    tags: [Order]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              amount:
 *                type: integer
 *              shipping_cost:
 *                type: integer
 *              orderId:
 *                type: string
 *              productId:
 *                type: string
 *              inventoryId:
 *                type: string
 *            required:
 *               - amount
 *               - shipping_cost
 *               - orderId
 *               - productId
 *               - inventoryId
 *    responses:
 *      200:
 *        description: order-product created
 */
router.post(
  "/order-product",
  validatorHandler(addItemsSchema, "body"),
  addItem
);

/**
 * @swagger
 * /api/v1/order/:id:
 *  patch:
 *    summary: update an order
 *    tags: [Order]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              total:
 *                type: integer
 *              status:
 *                type: string
 *    responses:
 *      200:
 *        description: order updated
 */
router.patch(
  "/:id",
  checkSession,
  validatorHandler(updateOrderSchema, "body"),
  updateOrder
);

/**
 * @swagger
 * /api/v1/order/:id:
 *  delete:
 *    summary: delete an order
 *    tags: [Order]
 *    responses:
 *      200:
 *        description: order deleted
 */
router.delete("/:id", checkSession, deleteOrder);

export default router;
