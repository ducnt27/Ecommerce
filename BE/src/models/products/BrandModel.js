import mongoose from "mongoose";
import { generateSlugs } from "../../middlewares/generateSlug.js";

const BrandSchema = new mongoose.Schema(
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
    thumbnail: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
BrandSchema.pre("save", async function (next) {
  const slug = generateSlugs(this.name);
  this.slug = slug;
  next();
});
const BrandModel = mongoose.model("Brand", BrandSchema);
export default BrandModel;
