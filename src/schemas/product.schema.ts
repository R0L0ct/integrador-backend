import joi from "joi";

const name = joi.string();
const image = joi.string();
const description = joi.string();
const price = joi.number().integer();
const stock = joi.number().integer();
const categoryId = joi.string();
const productId = joi.string();
const size = joi.string();
const recommended = joi.boolean();

const createProductSchema = joi.object({
  name: name.required(),
  image: image.required(),
  description: description.required(),
  price: price.required(),
  categoryId: categoryId.required(),
  recommended: recommended,
});

const updateProductSchema = joi.object({
  name: name,
  image: image,
  description: description,
  price: price,
  recommended: recommended,
});

const createInventorySchema = joi.object({
  size: size.required(),
  stock: stock.required(),
  productId: productId.required(),
});

const updateInventorySchema = joi.object({
  size: size,
  stock: stock,
});

export {
  createProductSchema,
  updateProductSchema,
  createInventorySchema,
  updateInventorySchema,
};
