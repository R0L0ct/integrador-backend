import joi from "joi";

const name = joi.string();
const image = joi.string();
const description = joi.string();
const price = joi.number().integer();
const stock = joi.number().integer();
const categoryId = joi.string();

const productSchema = joi.object({
  name: name.required(),
  image: image.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  categoryId: categoryId.required(),
});

export { productSchema };
