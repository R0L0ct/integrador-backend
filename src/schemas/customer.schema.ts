import joi from "joi";

const name = joi.string();
const lastname = joi.string();
const phone = joi.string();
const email = joi.string().email();
const userId = joi.string();
const country = joi.string();
const state_province = joi.string();
const city = joi.string();
const adress = joi.string();

const createCustomerSchema = joi.object({
  name: name.required(),
  lastname: lastname.required(),
  phone: phone.required(),
  email: email.required(),
  userId: userId.required(),
  adress: {
    country: country.required(),
    state_province: state_province.required(),
    city: city.required(),
    adress: adress.required(),
  },
});

const updateCustomerSchema = joi.object({
  name: name,
  lastname: lastname,
  phone: phone,
  email: email,
  adress: {
    country: country,
    state_province: state_province,
    city: city,
    adress: adress,
  },
});

export { createCustomerSchema, updateCustomerSchema };
