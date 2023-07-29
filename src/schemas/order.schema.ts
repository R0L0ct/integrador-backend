import joi from "joi";

const id = joi.string();
const total = joi.number().integer();
const customerId = joi.string();

const createOrderSchema = joi.object({
  total: total,
  customerId: customerId.required(),
});

const getOrderSchema = joi.object({
  id: id.required(),
});

export { createOrderSchema, getOrderSchema };
