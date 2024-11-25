// import CategoryModel from "../../models/products/CategoryModel";
import CategoryModel from "../../models/products/CategoryModel.js";
import STATUS from "../../utils/status.js";
import { CategoryValidate } from "../../validatoins/ProductValidation.js";

export const createCategory = async (req, res) => {
  try {
    const { error } = CategoryValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const { name, thumbnail, description } = req.body;
    const newCategory = await CategoryModel.create({
      name,
      thumbnail,
      description,
    });
    return res.status(STATUS.OK).json({
      message: "Tạo danh mục thành công",
      data: newCategory,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { error } = CategoryValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const { id } = req.params;
    const { name, description, thumbnail } = req.body;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn danh mục",
      });
    }
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Danh mục không tồn tại",
      });
    }
    const categoryUpdated = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        thumbnail,
        description,
      },
      { new: true }
    );
    return res.status(STATUS.OK).json({
      message: "Cập nhật danh mục thành công",
      data: categoryUpdated,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const { tab = 1 } = req.body;
    const category = await CategoryModel.find({
      deleted: tab === 1 ? false : true,
    });
    return res.status(STATUS.OK).json({
      message: "Lấy danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn danh mục",
      });
    }
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Danh mục không tồn tại",
      });
    }
    return res.status(STATUS.OK).json(category);
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn danh mục",
      });
    }
    const category = await CategoryModel.findOne({ slug });
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Danh mục không tồn tại",
      });
    }
    return res.status(STATUS.OK).json(category);
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn danh mục",
      });
    }
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Danh mục không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Xóa danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const restoreCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn danh mục",
      });
    }
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { deleted: false },
      { new: true }
    );
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Danh mục không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Khôi phục danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
