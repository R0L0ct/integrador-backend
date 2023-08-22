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

router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.post(
  "/",
  checkSession,
  validatorHandler(createOrderSchema, "body"),
  createNewOrder
);
router.post(
  "/order-product",
  validatorHandler(addItemsSchema, "body"),
  addItem
);
router.patch(
  "/:id",
  checkSession,
  validatorHandler(updateOrderSchema, "body"),
  updateOrder
);
router.delete("/:id", checkSession, deleteOrder);

export default router;
