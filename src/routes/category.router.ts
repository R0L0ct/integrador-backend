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

router.post(
  "/",
  validatorHandler(createCategorySchema, "body"),
  createNewCategory
);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.patch(
  "/:id",
  validatorHandler(updateCategorySchema, "body"),
  updateCategory
);
router.delete("/:id", deleteCategory);

export default router;
