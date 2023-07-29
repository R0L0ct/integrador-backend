import joi from "joi";

const name = joi.string();
const email = joi.string().email();
const password = joi.string();
const role = joi.string();

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role,
});

const updateUserSchema = joi.object({
  name: name,
  email: email,
  password: password,
  role: role,
});

export { createUserSchema, updateUserSchema };
