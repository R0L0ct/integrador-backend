import express from "express";
import { validatorHandler } from "../middlewares/validator.middleware";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../schemas/customer.schema";
import {
  createNewCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
} from "../controllers/customer.controller";
const router = express.Router();

router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
  createNewCustomer
);
router.get("/", getAllCustomers);
router.get("/:id", getCustomer);
router.patch(
  "/:id",
  validatorHandler(updateCustomerSchema, "body"),
  updateCustomer
);
router.delete("/:id", deleteCustomer);

export default router;
