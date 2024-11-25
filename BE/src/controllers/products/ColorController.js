import ColorModel from "../../models/products/ColorModel.js";
import { colorValidate } from "../../validatoins/ProductValidation.js";

export const createColor = async (req, res) => {
  try {
    const { error } = colorValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
  } catch (error) {}
};
