import ProductModel from "../../models/products/ProductModel";
import { productValidate } from "../../validatoins/ProductValidation";

export const createProduct = async (req, res) => {
  try {
    const { error } = productValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const { name, image, gallery, price, discount, quantity, description } =
      req.body;
    const product = await ProductModel.create({
      name,
      image,
      gallery,
      price,
      discount,
      quantity,
      description,
    });
    return res.status(201).json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { error } = productValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const { id } = req.params;
    const { name, image, gallery, price, discount, quantity, description } =
      req.body;
  } catch (error) {}
};
