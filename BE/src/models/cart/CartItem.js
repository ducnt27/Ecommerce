import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    attribute: {
      type: mongoose.Types.ObjectId,
      ref: "Attributes",
      required: true,
    },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);
const CartItemModel = mongoose.model("CartItem", CartItemSchema);
export default CartItemModel;
