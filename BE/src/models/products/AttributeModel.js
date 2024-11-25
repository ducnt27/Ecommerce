import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    color: {
      type: mongoose.Types.ObjectId,
      ref: "Color",
      required: true,
    },
    size: {
      type: mongoose.Types.ObjectId,
      ref: "Size",
      required: "true",
    },
    price: {
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
const AttributeModel = mongoose.model("Attribute", attributeSchema);
export default AttributeModel;
