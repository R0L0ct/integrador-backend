import express from "express";
import { validatorHandler } from "../middlewares/validator.middleware";
import { productSchema } from "../schemas/product.schema";
import {
  createNewProduct,
  getAllProducts,
  getProduct,
} from "../controllers/product.controller";
const router = express.Router();

router.post("/", validatorHandler(productSchema, "body"), createNewProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);

export default router;
