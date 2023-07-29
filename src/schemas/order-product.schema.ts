import joi from "joi";

const amount = joi.number().integer();
const shippingCost = joi.number().integer();
const orderId = joi.string();
const productId = joi.string();

const addItemsSchema = joi.object({
  amount: amount.required(),
  shippingCost: shippingCost.required(),
  orderId: orderId.required(),
  productId: productId.required(),
});

export { addItemsSchema };
