// import CategoryModel from "../../models/products/CategoryModel";
import BrandModel from "../../models/products/BrandModel.js";
import STATUS from "../../utils/status.js";
import { BrandValidate } from "../../validatoins/ProductValidation.js";

export const createBrand = async (req, res) => {
  try {
    const { error } = BrandValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const { name, thumbnail } = req.body;
    const newBrand = await BrandModel.create({
      name,
      thumbnail,
    });
    return res.status(STATUS.OK).json({
      message: "Tạo thương hiệu thành công",
      data: newBrand,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const updateBrand = async (req, res) => {
  try {
    const { error } = BrandValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const { id } = req.params;
    const { name, thumbnail } = req.body;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn thương hiệu",
      });
    }
    const brand = await BrandValidate.findById(id);
    if (!brand) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Thương hiệu không tồn tại",
      });
    }
    const brandUpdated = await BrandValidate.findByIdAndUpdate(
      id,
      {
        name,
        thumbnail,
      },
      { new: true }
    );
    return res.status(STATUS.OK).json({
      message: "Cập nhật thương hiệu thành công",
      data: brandUpdated,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const brand = await BrandModel.find({ deleted: false });
    if (!brand) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Không có thương hiệu",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Lấy danh sách thương hiệu thành công",
      data: brand,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getAllBrands = async (req, res) => {
  try {
    const { tab = 1, page = 1, pageSize = 10 } = req.query;

    // Điều kiện query theo tab
    const filter = {
      deleted: tab == 1 ? false : true,
    };

    // Lấy danh mục và phân trang
    const brands = await BrandModel.find(filter)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    const total = await BrandModel.countDocuments(filter);

    return res.status(STATUS.OK).json({
      message: "Lấy thương hiệu thành công",
      data: brands,
      total,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn thương hiệu",
      });
    }
    const brand = await BrandModel.findById(id);
    if (!brand) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Thương hiệu không tồn tại",
      });
    }
    return res.status(STATUS.OK).json(brand);
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getBrandBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn thương hiệu",
      });
    }
    const brand = await BrandModel.findOne({ slug });
    if (!category) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Thương hiệu không tồn tại",
      });
    }
    return res.status(STATUS.OK).json(category);
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn thương hiệu",
      });
    }
    const brand = await BrandModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!brand) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Thương hiệu không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Xóa thương hiệu thành công",
      data: brand,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const restoreBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn thương hiệu",
      });
    }
    const brand = await BrandModel.findByIdAndUpdate(
      id,
      { deleted: false },
      { new: true }
    );
    if (!brand) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Thương hiệu không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Khôi phục danh mục thành công",
      data: brand,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
