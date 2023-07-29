import { checkSession } from "../middlewares/session.middleware";
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
import { createOrderSchema } from "../schemas/order.schema";
import { addItemsSchema } from "../schemas/order-product.schema";
const router = express.Router();

router.get("/", checkSession, getAllOrders);
router.get("/:id", checkSession, getOrder);
router.post(
  "/",
  checkSession,
  validatorHandler(createOrderSchema, "body"),
  createNewOrder
);
router.post(
  "/add-item",
  checkSession,
  validatorHandler(addItemsSchema, "body"),
  addItem
);
router.patch("/:id", checkSession, updateOrder);
router.delete("/:id", checkSession, deleteOrder);

export default router;
