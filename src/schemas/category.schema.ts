import joi from "joi";

const name = joi.string();

const createCategorySchema = joi.object({
  name: name.required(),
});

const updateCategorySchema = joi.object({
  name: name,
});

export { createCategorySchema, updateCategorySchema };
