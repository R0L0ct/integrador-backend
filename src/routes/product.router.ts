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
  getAllProducts,
  getProduct,
  updateInventoryItem,
  updateProduct,
} from "../controllers/product.controller";
import { checkAdminSession } from "../middlewares/session.middleware";
const router = express.Router();

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  createNewProduct
);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.patch(
  "/:id",
  checkAdminSession,
  validatorHandler(updateProductSchema, "body"),
  updateProduct
);
router.delete("/:id", deleteProduct);

router.post(
  "/inventory",
  validatorHandler(createInventorySchema, "body"),
  createInventoryItem
);
router.patch(
  "/inventory/:id",
  validatorHandler(updateInventorySchema, "body"),
  updateInventoryItem
);
router.delete("/inventory/:id", deleteInventoryItem);

export default router;
