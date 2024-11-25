import slugify from "slugify";
import crypto from "crypto";

export const generateSlugs = (value) => {
  const slug = `${slugify(value, {
    replacement: "-", // thay thế khoảng trắng bằng ký tự thay thế, mặc định là `-`
    remove: /[*+~.()'"!:@]/g, // loại bỏ các ký tự khớp với biểu thức chính quy, mặc định là `undefined`
    lower: false, // chuyển thành chữ thường, mặc định là `false`
    strict: false, // loại bỏ các ký tự đặc biệt trừ ký tự thay thế, mặc định là `false`
    locale: "vn", // mã ngôn ngữ của locale sẽ được sử dụng
    trim: true, // loại bỏ ký tự thay thế ở đầu và cuối chuỗi, mặc định là `true`
  })}-${crypto.randomBytes(5).toString("hex")}`;
  return slug;
};
