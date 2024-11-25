import mongoose from "mongoose";
import { generateSlugs } from "../../middlewares/generateSlug.js";

const CategorySchema = new mongoose.Schema(
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
    description: {
      type: String,
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
CategorySchema.pre("save", async function (next) {
  const slug = generateSlugs(this.name);
  this.slug = slug;
  next();
});
const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
