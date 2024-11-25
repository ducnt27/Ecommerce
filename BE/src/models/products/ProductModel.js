import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    typeZ: String,
    unique: true,
    index: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  gallery: [
    {
      url: string,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  quantitySold: {
    // số lượng đã bán
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  attribute: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Attribute",
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
