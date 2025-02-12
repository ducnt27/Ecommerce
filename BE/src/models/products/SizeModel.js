import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const SizeModel = mongoose.model("Sizes", sizeSchema);
export default SizeModel;
