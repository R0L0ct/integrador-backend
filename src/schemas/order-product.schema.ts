import joi from "joi";

const amount = joi.number().integer();
const shipping_cost = joi.number().integer();
const orderId = joi.string();
const productId = joi.string();
const inventoryId = joi.string();

const addItemsSchema = joi.object({
  amount: amount.required(),
  shipping_cost: shipping_cost.required(),
  orderId: orderId.required(),
  productId: productId.required(),
  inventoryId: inventoryId.required(),
});

export { addItemsSchema };
