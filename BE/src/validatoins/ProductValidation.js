import Joi from "joi";

export const CategoryValidate = Joi.object({
  name: Joi.string().required().messages({}),
  thumbnail: Joi.string(),
});
export const BrandValidate = Joi.object({
  name: Joi.string().required().messages({}),
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
  brand: Joi.string(),
  price: Joi.number().required().messages({}),
  discount: Joi.number()
    .min(0)
    .max(Joi.ref("price")) // Kiểm tra discount <= price
    .messages({
      "number.max": "Giảm giá phải nhỏ hơn giá sản phẩm",
      "number.min": "Giảm giá phải là số dương",
    }),
  gallery: Joi.array().messages({}),
  image: Joi.array().max(1).messages({}),
  attribute: Joi.array().items(Joi.object().required().messages({})),
  description: Joi.string().required().min(12).messages({}),
  // discount: Joi.number(),
  quantity: Joi.number(),
  countInStock: Joi.number(),
  featured: Joi.boolean(),
});
