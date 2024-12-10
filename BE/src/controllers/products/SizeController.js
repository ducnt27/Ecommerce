import SizeModel from "../../models/products/SizeModel.js";
import STATUS from "../../utils/status.js";
import { sizeValidate } from "../../validatoins/ProductValidation.js";

export const createSize = async (req, res) => {
  try {
    const { error } = sizeValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const { name } = req.body;
    const size = await SizeModel.create(name);
    return res.status(STATUS.OK).json({
      message: "Tạo kích thước thành công",
      data: size,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const updateSize = async (req, res) => {
  try {
    const { error } = sizeValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn kích thước",
      });
    }
    const { name } = req.body;
    const sizeUpdated = await SizeModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!sizeUpdated) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Kích thước không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Cập nhật kích thước thành công",
      data: sizeUpdated,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getAllSizes = async (req, res) => {
  try {
    const sizes = await SizeModel.find();
    if (!sizes) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Không có kích thước",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Lấy danh sách kích thước thành công",
      data: sizes,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};

export const getSizeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn kích thước",
      });
    }
    const size = await SizeModel.findById(id);
    if (!size) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Kích thước không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Lấy kích thước thành công",
      data: size,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const removeSizeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn kích thước",
      });
    }
    const category = await SizeModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Kích thước không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Xóa kích thước thành công",
      data: category,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const restoreSize = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn kích thước",
      });
    }
    const category = await SizeModel.findByIdAndUpdate(
      id,
      { deleted: false },
      { new: true }
    );
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Kích thước không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Khôi phục kích thước thành công",
      data: category,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
