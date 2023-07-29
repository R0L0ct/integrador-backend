import joi from "joi";

const email = joi.string().email();
const password = joi.string();

const loginUserSchema = joi.object({
  email: email.required(),
  password: password.required(),
});

export { loginUserSchema };
