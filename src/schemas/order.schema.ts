import joi from "joi";

const id = joi.string();
const total = joi.number().integer();
const customerId = joi.string();
const status = joi.string();

const createOrderSchema = joi.object({
  total: total.required(),
  status: status.required(),
  customerId: customerId.required(),
});

const updateOrderSchema = joi.object({
  total: total,
  status: status,
});

const getOrderSchema = joi.object({
  id: id.required(),
});

export { createOrderSchema, getOrderSchema, updateOrderSchema };
