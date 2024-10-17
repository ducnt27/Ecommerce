import Joi from "joi";

export const loginFormValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Bạn chưa nhập email",
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().required().messages({
    "any.required": "Bạn chưa nhập password",
    "string.min": "Mật khẩu phải trên 6 kí tự",
  }),
});
export const registerFormValidation = Joi.object({
  full_name: Joi.string().required().messages({
    "any.required": "Bạn chưa nhập tên đăng nhập",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Bạn chưa nhập email",
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().required().min(6).max(30).messages({
    "any.required": "Mật khẩu là bắt buộc!",
    "any.empty": " Mật khẩu không dược để trống",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    "string.max": "Mật khẩu phải có nhiều nhất {#limit} ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Confirm Password là bắt buộc",
    "any.only": "Mật khẩu không trùng khớp",
  }),
});
export const socialUserValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Bạn chưa nhập email",
    "string.email": "Email không đúng định dạng",
  }),
  full_name: Joi.string().required().messages({
    "any.required": "Bạn chưa nhập họ tên",
  }),
  picture: Joi.string().required().messages({
    "any.required": "Bạn chưa nhập ảnh",
  }),
  uid: Joi.string().required().messages({
    "any.required": "Bạn chưa nhập uuid",
  }),
  provider: Joi.string().required().messages({
    "any.required": "Bạn chưa nhập loại đăng nhập",
  }),
});
