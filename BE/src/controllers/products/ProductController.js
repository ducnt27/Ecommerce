import ProductModel from "../../models/products/ProductModel.js";
import { productValidate } from "../../validatoins/ProductValidation.js";
import { generateSlugs } from "../../middlewares/generateSlug.js";
import STATUS from "../../utils/status.js";

export const createProduct = async (req, res) => {
  try {
    const { error } = productValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const {
      name,
      image,
      category,
      gallery,
      price,
      discount,
      size,
      quantity,
      featured,
      description,
    } = req.body;
    const product = await ProductModel.create({
      name,
      image,
      category,
      gallery,
      price,
      size,
      discount,
      quantity,
      featured,
      description,
    });
    return res.status(STATUS.OK).json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { error } = productValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }
    const { id } = req.params;
    const {
      name,
      category,
      image,
      gallery,
      price,
      size,
      discount,
      quantity,
      featured,
      description,
    } = req.body;
    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn sản phẩm",
      });
    }
    let slugProduct = existingProduct.slug;
    if (existingProduct.name.toLowerCase() !== name.toLowerCase()) {
      slugProduct = generateSlugs(name);
    }
    const productUpdated = await ProductModel.findByIdAndUpdate(
      id,
      {
        name,
        category,
        image,
        gallery,
        price,
        size,
        discount,
        quantity,
        description,
        slug: slugProduct,
        featured,
      },
      { new: true }
    );
    return res.status(STATUS.OK).json({
      message: "Cập nhật sản phẩm thành công",
      data: productUpdated,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const pagingProducts = async (req, res) => {
  try {
    const { tab = 1, pageIndex = 1, pageSize = 10 } = req.query;
    const filter = {
      deleted: tab == 1 ? false : true,
    };
    const products = await ProductModel.find(filter)
      .skip((pageIndex - 1) * pageSize)
      .limit(Number(pageSize))
      .populate("category", "id name");
    const total = await ProductModel.countDocuments(products);
    return res.status(STATUS.OK).json({
      message: "Lấy danh sách sản phẩm thành công",
      data: products,
      total,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn sản phẩm",
      });
    }
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Sản phẩm không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Lấy sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn sản phẩm",
      });
    }
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!product) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Sản phẩm không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Xóa sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const restoreProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn sản phẩm",
      });
    }
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { deleted: false },
      { new: true }
    );
    if (!product) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Sản phẩm không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Khôi phục sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn sản phẩm",
      });
    }
    const product = await ProductModel.findOne({ slug: slug }).populate(
      "category"
    );
    if (!product) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Sản phẩm không tồn tại",
      });
    }
    return res.status(STATUS.OK).json({
      message: "Lấy sản phẩm theo slug thành công",
      data: product,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
