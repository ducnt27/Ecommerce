import ProductModel from "../../models/products/ProductModel.js";
import { productValidate } from "../../validatoins/ProductValidation.js";
import { generateSlugs } from "../../middlewares/generateSlug.js";
import STATUS from "../../utils/status.js";
import AttributeModel from "../../models/products/AttributeModel.js";
import { formatDataPaging } from "../../common/formatFunc.js";
import { Types } from "mongoose";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      gallery,
      price,
      discount,
      attribute = [],
      featured,
      brand,
      description,
    } = req.body;
    const { error } = productValidate.validate(req.body);
    if (error) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: error.details[0].message,
      });
    }

    const dataAttributes = await AttributeModel.create(attribute);
    const quantityAttributes = await dataAttributes.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    const product = await ProductModel.create({
      name,
      image,
      category,
      gallery,
      price,
      attribute: dataAttributes.map((item) => item._id),
      discount,
      quantity: quantityAttributes,
      featured,
      brand,
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
      .populate("category", "id name")
      .populate("brand", "id name")
      .select("-description");
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

// Helper functions
const buildProductQuery = ({
  tab,
  category,
  minPrice,
  maxPrice,
  featured,
  isDiscount,
  search,
  brand,
}) => {
  const query = {
    deleted: tab === 1 ? false : true,
  };

  if (category) query.category = category;
  if (brand) query.brand = brand;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (featured) query.featured = true;

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  // Thêm điều kiện lọc sản phẩm giảm giá
  if (isDiscount === "true") {
    query.discount = { $gt: 0 }; // Lọc sản phẩm có discount > 0
  }
  return query;
};

const handleAttributeFilters = async (colorId, sizeId) => {
  const colorArray = colorId;
  const sizeArray = sizeId;

  if (!colorArray.length && !sizeArray.length) return null;

  let attributeQuery = {};

  if (colorArray.length && sizeArray.length) {
    attributeQuery = {
      $and: [{ colorId: { $in: colorArray } }, { sizeId: { $in: sizeArray } }],
    };
  } else if (colorArray.length) {
    attributeQuery = { colorId: { $in: colorArray } };
  } else {
    attributeQuery = { sizeId: { $in: sizeArray } };
  }

  const attributes = await AttributeModel.find(attributeQuery, "_id");
  return attributes.map((attr) => attr._id);
};

const buildSortOptions = (sort, order) => {
  const sortMap = {
    priceAsc: { price: 1 },
    priceDesc: { price: -1 },
    nameAsc: { name: 1 },
    nameDesc: { name: -1 },
    createdAt: { createdAt: order === "desc" ? -1 : 1 },
  };

  return sortMap[sort] || { createdAt: order === "desc" ? -1 : 1 };
};

const calculatePagination = (page, limit, totalItems) => {
  const currentPage = Number(page);
  const pageSize = limit ? Number(limit) : totalItems; // Nếu không có limit, lấy tất cả
  const totalPages = Math.ceil(totalItems / pageSize);
  const skip = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageSize,
    totalPages,
    skip,
  };
};

const calculateProductAttributes = (product) => {
  const attributes = product.attribute || [];
  const uniqueColors = new Set();
  const uniqueSizes = new Set();

  attributes.forEach((attr) => {
    if (attr.colorId) uniqueColors.add(attr.colorId.toString());
    if (attr.sizeId) uniqueSizes.add(attr.sizeId.toString());
  });
  const discountPercentage =
    product?.discount && product?.price
      ? Math.round((product.discount / product.price) * 100)
      : 0;
  const finalPrice = product.price - product.discount;
  return {
    ...product._doc,
    uniqueColorCount: uniqueColors.size,
    uniqueSizeCount: uniqueSizes.size,
    finalPrice,
    discountPercentage,
  };
};
export const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit,
      sort,
      order = "desc",
      category,
      brand,
      minPrice,
      maxPrice,
      featured,
      colorId = [],
      sizeId = [],
      tab = 1,
      search,
      isDiscount,
    } = req.query;
    // console.log("getAllProducts", req.query);

    // Xây dựng query filters
    const productQuery = buildProductQuery({
      tab,
      category,
      minPrice,
      maxPrice,
      featured,
      search,
      isDiscount,
      brand,
    });

    // Xử lý attribute filters (color và size)
    const attributeIds = await handleAttributeFilters(colorId, sizeId);
    if (attributeIds) {
      productQuery.attribute = { $in: attributeIds };
    }

    // Xử lý sorting
    const sortOptions = buildSortOptions(sort, order);

    // Đếm tổng số sản phẩm trước khi phân trang
    const totalProducts = await ProductModel.countDocuments(productQuery);

    // Xử lý phân trang
    const pagination = calculatePagination(page, limit, totalProducts);

    // Truy vấn sản phẩm với phân trang
    const products = await ProductModel.find(productQuery)
      .select("-description")
      .sort(sortOptions)
      .skip(pagination.skip)
      .limit(pagination.pageSize)
      .populate("attribute")
      .populate("category", "id name");

    // Xử lý thông tin về màu và size
    const productsWithCounts = products.map(calculateProductAttributes);

    // Format kết quả trả về
    const result = formatDataPaging({
      limit: pagination.pageSize,
      pageIndex: pagination.currentPage,
      totalPage: pagination.totalPages,
      data: productsWithCounts,
      count: totalProducts,
    });

    return res.status(STATUS.OK).json(result);
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};

export const getProductDetail = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("slug", slug);
    if (!slug) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn sản phẩm",
      });
    }
    const product = await ProductModel.findOne({ slug: slug })
      .populate([
        {
          path: "category",
          select: "id name",
        },
        {
          path: "brand",
          select: "id name",
        },
        {
          path: "attribute",
          populate: [
            {
              path: "colorId",
              model: "Colors",
            },
            {
              path: "sizeId",
              model: "Sizes",
            },
          ],
        },
      ])
      .lean();
    await ProductModel.findOneAndUpdate(
      { slug: slug },
      { $in: { ViewCount: 1 } }
    );
    const discountPercentage =
      product?.discount && product?.price
        ? Math.round((product.discount / product.price) * 100)
        : 0;
    const listColor = product?.attribute?.reduce((acc, item) => {
      let group = acc.find((g) => g.colorId === item.colorId?._id);
      // Nếu nhóm không tồn tại, tạo nhóm mới
      if (!group) {
        group = {
          colorId: item.colorId._id,
          colorName: item.colorId.name,
          quantity: item.quantity,
          colorCode: item.colorId.code,
          list: [item],
        };
        acc.push(group);
        return acc;
      }
      // Nếu nhóm đã tồn tại, thêm item vào nhóm đó
      group.list.push(item);
      group.quantity = item.quantity + group.quantity;
      return acc;
    }, []);

    const listSize = product?.attribute?.reduce((acc, item) => {
      let group = acc.find((g) => g.sizeId === item.sizeId?._id);
      if (!group) {
        group = {
          sizeId: item.sizeId._id,
          sizeName: item.sizeId.name,
          quantity: item.quantity,
          sizeCode: item.sizeId.code,
          list: [item],
        };
        acc.push(group);
        return acc;
      }
      group.list.push(item);
      group.quantity = item.quantity + group.quantity;
      return acc;
    }, []);

    return res
      .status(STATUS.OK)
      .json({ data: { ...product, discountPercentage, listColor, listSize } });
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
