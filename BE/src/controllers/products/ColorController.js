import ColorModel from "../../models/products/ColorModel.js";
import { colorValidate } from "../../validatoins/ProductValidation.js";
import STATUS from "../../utils/status.js";
export const createColor = async (req, res) => {
  try {
    const { error } = colorValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const { name, code } = req.body;
    const color = await ColorModel.create({ name, code });
    return res.status(STATUS.OK).json({
      message: "Thêm màu sắc thành công",
      data: color,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const updateColor = async (req, res) => {
  try {
    const { error } = colorValidate.validate(req.body);
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
    const { name, code } = req.body;
    const colorUpdated = await ColorModel.findByIdAndUpdate(
      id,
      { name, code },
      { new: true }
    );
    if (!colorUpdated) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Màu sắc không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Cập nhật màu sắc thành công",
      data: colorUpdated,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const pagingColor = async (req, res) => {
  try {
    const { tab = 1, pageIndex = 1, pageSiZe = 10 } = req.query;
    const filter = {
      deleted: tab == 1 ? false : true,
    };
    const colors = await ColorModel.find(filter)
      .skip((pageIndex - 1) * pageSiZe)
      .limit(Number(pageSiZe));
    const total = await ColorModel.countDocuments(filter);
    return res.status(STATUS.OK).json({
      message: "Lấy danh sách màu sắc thành công",
      data: colors,
      total,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getAllColors = async (req, res) => {
  try {
    const colors = await ColorModel.find();
    if (!colors) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Không có màu sắc",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Lấy danh sách màu sắc thành công",
      data: colors,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getColorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn màu sắc",
      });
    }
    const color = await ColorModel.findById(id);
    if (!color) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Màu sắc không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Lấy màu sắc thành công",
      data: color,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const removeColorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn màu sắc",
      });
    }
    const category = await ColorModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Màu sắc không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Xóa màu sắc thành công",
      data: category,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const restoreColorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn màu sắc",
      });
    }
    const category = await ColorModel.findByIdAndUpdate(
      id,
      { deleted: false },
      { new: true }
    );
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Màu sắc không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Khôi phục màu sắc thành công",
      data: category,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
