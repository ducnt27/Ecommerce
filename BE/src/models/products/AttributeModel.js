import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    colorId: {
      type: mongoose.Types.ObjectId,
      ref: "Colors",
      required: true,
    },
    sizeId: {
      type: mongoose.Types.ObjectId,
      ref: "Sizes",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const AttributeModel = mongoose.model("Attributes", attributeSchema);
export default AttributeModel;
