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

/**
 * @swagger
 * /api/v1/customer:
 *  post:
 *    summary: create a customer
 *    tags: [Customer]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              lastname:
 *                type: string
 *              phone:
 *                type: string
 *              email:
 *                type: string
 *              userId:
 *                type: string
 *              adress:
 *                type: object
 *                properties:
 *                  country:
 *                    type: string
 *                  state_province:
 *                    type: string
 *                  city:
 *                    type: string
 *                  adress:
 *                    type: string
 *                required:
 *                   - country
 *                   - state_province
 *                   - city
 *                   - adress
 *            required:
 *               - name
 *               - lastname
 *               - phone
 *               - email
 *               - userId
 *               - adress
 *    responses:
 *      200:
 *        description: customer created
 */
router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
  createNewCustomer
);

/**
 * @swagger
 * /api/v1/customer:
 *  get:
 *    summary: get all customers
 *    tags: [Customer]
 *    responses:
 *      200:
 *        description: customers geted
 */
router.get("/", getAllCustomers);

/**
 * @swagger
 * /api/v1/customer/:id:
 *  get:
 *    summary: get a customer
 *    tags: [Customer]
 *    responses:
 *      200:
 *        description: customer geted
 */
router.get("/:id", getCustomer);

/**
 * @swagger
 * /api/v1/customer/:id:
 *  patch:
 *    summary: update a customer
 *    tags: [Customer]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              lastname:
 *                type: string
 *              phone:
 *                type: string
 *              email:
 *                type: string
 *              adress:
 *                type: object
 *                properties:
 *                  country:
 *                    type: string
 *                  state_province:
 *                    type: string
 *                  city:
 *                    type: string
 *                  adress:
 *                    type: string
 *    responses:
 *      200:
 *        description: customer updated
 */
router.patch(
  "/:id",
  validatorHandler(updateCustomerSchema, "body"),
  updateCustomer
);

/**
 * @swagger
 * /api/v1/customer/:id:
 *  delete:
 *    summary: delete a customer
 *    tags: [Customer]
 *    responses:
 *      200:
 *        description: customer deleted
 */
router.delete("/:id", deleteCustomer);

export default router;
