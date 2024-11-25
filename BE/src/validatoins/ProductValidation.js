import Joi from "joi";

export const CategoryValidate = Joi.object({
  name: Joi.string().required().messages({}),
  description: Joi.string().required().messages({}),
  thumbnail: Joi.string().required().messages({}),
});
export const colorValidate = Joi.object({
  name: Joi.string().required().messages({}),
  code: Joi.string().required().min(7).messages({}),
});
export const sizeValidate = Joi.object({
  name: Joi.string().required().messages({}),
});
export const productValidate = Joi.object({
  name: Joi.string().required().messages({}),
  category: Joi.string().required().messages({}),
  price: Joi.number().required().messages({}),
  gallery: Joi.array().items(
    Joi.object({
      url: Joi.string().required().messages({}),
      _id: Joi.string().optional(),
    })
  ),
  image: Joi.string().required().messages({}),
  description: Joi.string().required().min(12).messages({}),
  discount: Joi.number(),
  quantity: Joi.number(),
  countInStock: Joi.number(),
  featured: Joi.boolean(),
  attribute: Joi.array().items(Joi.object().required().messages({})),
});
