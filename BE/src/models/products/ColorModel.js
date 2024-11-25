import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const ColorModel = mongoose.model("ColorModel", colorSchema);
export default ColorModel;
