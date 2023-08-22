import joi from "joi";

const name = joi.string();
const email = joi.string().email();
const password = joi.string();
const role = joi.string();

const registerUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role,
});

export { registerUserSchema };
