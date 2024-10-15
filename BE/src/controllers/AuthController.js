import UserModel from "../models/UserModel.js";
import STATUS from "../utils/status.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
  loginFormValidation,
  registerFormValidation,
  socialUserValidation,
} from "../validatoins/AuthValidation.js";
import Refreshtoken from "../models/Refreshtoken.js";
import { get } from "mongoose";

export const generateAccessToken = async (payload) => {
  return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "1h",
  });
};
export const generateRefreshToken = async (payload) => {
  return jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: "60d",
  });
};
export const loginForm = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = loginFormValidation.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Email không tồn tại",
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Mật khẩu không đúng",
      });
    }
    const accessToken = await generateAccessToken({
      id: user._id,
      email: user.email,
      is_admin: user.is_admin,
    });
    const refreshToken = await generateRefreshToken({
      id: user._id,
      email: user.email,
      is_admin: user.is_admin,
    });
    // const ref = await new Refreshtoken({ token: refreshToken, userId: user._id }).save()
    res.cookie("token", refreshToken, {
      maxAge: 1000 * 60 * 24 * 60 * 60,
      httpOnly: true,
      path: "/",
    });
    // console.log(ref)
    delete user._doc.password;
    return res.status(STATUS.OK).json({
      message: "Đăng nhập thành công",
      accessToken: accessToken,
      user: user,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};

export const registerForm = async (req, res) => {
  try {
    const { email, password, confirmPassword, username } = req.body;
    const { error } = registerFormValidation.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Email/password không hợp lệ",
      });
    }
    if (password !== confirmPassword) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Mật khẩu không trùng khớp",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      confirmPassword,
    });
    return res.status(STATUS.OK).json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const socialUser = async (req, res) => {
  try {
    const { error } = await socialUserValidation.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const { email, full_name, picture, uid, provider } = req.body;
    const existUser = await UserModel.findOne({ email, uid });
    if (existUser) {
      const accessToken = await generateAccessToken({
        id: existUser._id,
        email: existUser._email,
        is_admin: existUser.is_admin,
      });
      const refreshToken = await generateRefreshToken({
        id: existUser._id,
        email: existUser._email,
        is_admin: existUser.is_admin,
      });
      // Refresh token sẽ được lưu trong cookie của người dùng dưới dạng httpOnly để đảm bảo bảo mật, giúp giảm nguy cơ bị tấn công thông qua việc đánh cắp token.
      res.cookie("token", refreshToken, {
        maxAge: 1000 * 60 * 24 * 60,
        httpOnly: true,
        path: "/",
      });
      return res.status(STATUS.OK).json({
        message: "Đăng nhập thành công",
        accessToken: accessToken,
        user: existUser,
      });
    }
    const newUser = await UserModel.create({
      email,
      full_name,
      uid,
      avatarUrl: picture,
      provider,
    });
    const accessToken = await generateAccessToken({
      id: newUser._id,
      email: newUser._email,
      is_admin: newUser.is_admin,
    });
    const refreshToken = await generateRefreshToken({
      id: newUser._id,
      email: newUser._email,
      is_admin: newUser.is_admin,
    });
    return res.status(STATUS.OK).json({
      message: "Đăng nhập thành công",
      accessToken: accessToken,
      user: newUser,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.token; // lấy refreshToken từ cookie của ng dùng, Token này đc lưu trc khi ng dùng đăng nhập, nếu cookie chưa có token đồng nghĩa vs việc ng dùng chưa đăng nhập/token ko hợp lệ
    if (!refreshToken) {
      return res.status(STATUS.AUTHENTICATOR).json({
        message: "Bạn chưa đăng nhập ",
      });
    }
    // sử dụng hàm jwt.verify để kiểm tra refreshToken có hợp lệ ko
    jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_TOKEN,
      async (err, user) => {
        if (err) {
          return res.status(STATUS.AUTHENTICATOR).json({
            message: "Token đã hết hạn mời bạn đăng nhập lại",
          });
        }
        if (!user) {
          return;
        }
        const payload = {
          id: user.id,
          email: user.email,
          is_admin: user.is_admin,
        };
        const NewAccessToken = await generateAccessToken(payload);
        const NewRefreshToken = await generateRefreshToken(payload);
        res.cookie("token", NewRefreshToken, {
          maxAge: 24 * 60 * 60 * 1000 * 60,
          httpOnly: true,
          path: "/",
          sameSite: "none",
          secure: true,
        });
        return res.status(STATUS.OK).json({
          message: "Tạo token thành công",
          accessToken: NewAccessToken,
        });
      }
    );
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const currentUser = async (req, res) => {
  try {
    const user = req.user;
    console.log("user", user);
    const existUser = await UserModel.findById(user?.id).select("-password");
    if (!existUser) {
      return res.status(STATUS.AUTHENTICATOR).json({
        message: "Không lấy được giá trị",
      });
    }

    return res.status(STATUS.OK).json({
      message: "Lấy thông tin thành công",
      data: existUser,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies;
    if (!refreshToken) {
      return res.status(STATUS.AUTHENTICATOR).json({
        message: "Bạn chưa đăng nhập ",
      });
    }
    jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_TOKEN,
      async (err, data) => {
        if (err) {
          res.cookie("token", "", {
            maxAge: 0,
          });
          return res.status(STATUS.OK).json({
            message: "Đăng xuất thành công",
          });
        }
        res.cookie("token", " ", {
          maxAge: 0,
        });
        return res.status(STATUS.OK).json({
          message: "Đăng xuất thành công",
        });
      }
    );
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
