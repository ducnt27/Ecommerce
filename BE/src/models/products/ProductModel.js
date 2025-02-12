import mongoose from "mongoose";
import { generateSlugs } from "../../middlewares/generateSlug.js";
import { type } from "os";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: Array,
      required: true,
      max: 1,
      default: [],
    },
    gallery: {
      type: Array,
      required: true,
      default: [],
    },
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
    attribute: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Attributes",
      },
    ],
    countInStock: {
      type: Number,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      default: "unisex",
    },
    isDiscounted: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
ProductSchema.pre("save", async function (next) {
  const slug = generateSlugs(this.name);
  this.slug = slug;
  next();
});
// Middleware để tự động cập nhật trường isDiscounted
ProductSchema.pre("save", function (next) {
  if (this.discount && this.discount > 0) {
    this.isDiscounted = true; // Nếu discount > 0, đặt isDiscounted = true
  } else {
    this.isDiscounted = false; // Ngược lại, đặt isDiscounted = false
  }
  next();
});
const ProductModel = mongoose.model("Products", ProductSchema);
export default ProductModel;
