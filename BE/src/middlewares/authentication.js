import UserModel from "../models/UserModel.js";
import STATUS from "../utils/status.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const authentication = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(STATUS.AUTHORIZED).json({
        message: "Bạn chưa đăng nhập",
      });
    }
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (err, user) => {
      if (err) {
        let message = "Lỗi token";
        if (err.message === "invalid token") {
          message = "Token không hợp lệ";
        }
        if (err.message === "jwt expired") {
          message = "Token đã hết hạn";
        }
        return res.status(STATUS.AUTHORIZED).json({
          message: message,
        });
      }

      const existUser = await UserModel.findById(user.id);
      if (!existUser) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Tài khoản không thỏa mãn",
        });
      }
      req.user = {
        id: existUser._id,
        email: existUser._email,
        is_admin: existUser.is_admin,
      };
      next();
    });
  } catch (error) {}
};
export default authentication;
