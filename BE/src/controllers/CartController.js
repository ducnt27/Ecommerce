import CartModel from "../models/cart/Cart.js";
import CartItemModel from "../models/cart/CartItem.js";
import ProductModel from "../models/products/ProductModel.js";
import STATUS from "../utils/status.js";
import { cartItemValidation } from "../validatoins/CartValidation.js";
import AttributeModel from "../models/products/AttributeModel.js";
export const addToCart = async (req, res) => {
  try {
    const user = req.user;
    console.log("cartUser", user?.id);
    if (!user) {
      return res
        .status(STATUS.AUTHORIZED)
        .json({ message: "Ban chua dang nhap" });
    }
    const { error } = cartItemValidation.validate(req.boyd);
    if (error) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: error.details[0].message });
    }
    const { productId, quantity, attribute } = req.body;
    let existingCart = await CartModel.findOne({ user: user?.id });
    console.log("existingCart", existingCart);
    if (!existingCart) {
      return res.status(STATUS.BAD_REQUEST).json({ message: "Loi he thong" });
    }
    const existingProductCart = await CartItemModel.findOne({
      product: productId,
      attribute: attribute,
      cart: existingCart.id,
    });
    console.log("1");
    if (existingProductCart) {
      const data = await CartItemModel.findByIdAndUpdate(
        existingProductCart._id,
        {
          quantity: existingProductCart.quantity + +quantity,
        },
        {
          new: true,
          populate: [
            { path: "product", select: "-description" },
            { path: "attribute" },
          ],
        }
      );
      return res.status(STATUS.OK).json({
        message: "Thêm thành công",
        type: "update",
        data,
      });
    }
    const existingProduct = await ProductModel.findById(productId);
    console.log("existingProduct", existingProduct);
    if (!existingProduct) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: "San pham khong ton tai" });
    }
    if (existingProduct?.deleted) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Sản phẩm bị xóa",
      });
    }
    if (existingProduct?.quantity < quantity) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Số lượng vượt quá",
      });
    }
    const newCartItem = await CartItemModel.create({
      product: productId,
      quantity,
      attribute,
      cart: existingCart._id,
    });
    if (!newCartItem) {
      return res.status(STATUS.INTERNAL).json({
        message: "Thêm thất bại",
      });
    }
    console.log("2");
    const data = await CartItemModel.findById(newCartItem?._id).populate([
      { path: "product", select: "-description" },
      { path: "attribute" },
    ]);
    console.log("dảta", data);
    return res.status(STATUS.OK).json({
      message: "Thêm vào giỏ hàng  thành công",
      data: data,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const updateCartItem = async (req, res) => {
  try {
    const user = req.user;
    const { quantity, attribute } = req.body;
    const { id } = req.params;
    if (!quantity && !attribute) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa truyền giá trị",
      });
    }

    if (!id)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn",
      });
    const cartUser = await CartModel.findOne({
      user: user?.id,
    });
    const existingCartItem = await CartItemModel.findById(id).populate(
      "attribute product"
    );

    if (!existingCartItem) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Không có giá trị thỏa mãn",
      });
    }

    let quantityDefault = quantity || existingCartItem?.quantity;
    if (quantity) {
      // Kiểm tra xem attribute có tồn tại không
      if (!existingingCartItem?.attribute?._id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Sản phẩm không còn loại này",
        });
      }
      // Kiểm tra số lượng sản phẩm so với số lượng trong attribute
      if (quantity > existingCartItem.attribute?.quantity) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: `Chỉ còn ${existingCartItem.attribute.quantity} sản phẩm loại hàng này`,
        });
      }
    }
    if (attribute) {
      const checkCartItem = await CartItemModel.findOne({
        attribute: attribute,
        cart: cartUser?._id,
      });

      if (checkCartItem) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Loại hàng này đã có ở giỏ hàng",
        });
      }
      const checkAttribute = await AttributeModel.findOne(attribute);
      if (!checkAttribute) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Sản phẩm không còn loại hàng này nữa",
        });
      }
      if (quantityDefault > checkAttribute.quantity) {
        quantityDefault = checkAttribute.quantity;
      }
    }
    const updatedCartItem = await CartItemModel.findByIdAndUpdate(
      id,
      {
        quantity: quantity ? quantity : existingCartItem?.quantity,
        attribute: attribute ? attribute : existingingCartItem.attribute,
      },
      {
        new: true,
        populate: [
          {
            path: "product",
            select: {
              name: 1,
              _id: 1,
              image: 1,
              quantitySold: 1,
              price: 1,
              discount: 1,
            },
          },
          {
            path: "attribute",
            populate: [
              {
                path: "colorId",
              },
              {
                path: "sizeId",
              },
            ],
          },
        ],
      }
    ).lean();
    if (!updatedCartItem) {
      return res.status(STATUS.INTERNAL).json({
        message: "Thay đổi giỏ hàng thất bại",
      });
    }
    const result = {
      quantity: updatedCartItem.quantity,
      createdAt: updatedCartItem.createdAt,
      _id: updatedCartItem._id,
      price: updatedCartItem.product.price,
      name: updatedCartItem.product.name,
      productId: updatedCartItem.product._id,
      quantitySold: updatedCartItem.product.quantitySold,
      discount: updatedCartItem.product.discount,
      image: updatedCartItem.product.thumbnail,
      attribute: updatedCartItem.attribute,
    };
    return res.status(STATUS.OK).json({
      message: "Thay đổi giỏ hàng thành công",
      data: result,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
export const pagingCart = async (req, res) => {
  try {
    const user = req.user;
    let existingCart = await CartModel.findOne({ user: user?.id });
    if (!existingCart) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Lỗi hệ thống",
      });
    }
    console.log("existingCart", existingCart);
    const listCartItems = await CartItemModel.find({
      cart: existingCart._id,
    })
      .populate([
        {
          path: "product",
          populate: {
            path: "attribute",
            populate: [
              {
                path: "colorId",
              },
              {
                path: "sizeId",
              },
            ],
          },
          select: {
            _id: 1,
            name: 1,
            discount: 1,
            price: 1,
            image: 1,
            attributes: 1,
            quantity: 1,
            isDiscounted: 1,
            discountPercentage: 1,
            createdAt: 1,
            slug: 1,
          },
        },
        {
          path: "attribute",
          populate: [
            {
              path: "colorId",
            },
            {
              path: "sizeId",
            },
          ],
        },
      ])
      .sort({ createAt: "asc" });
    // console.log("listCCartItem", listCartItems);
    const listData = listCartItems.reduce((acc, item) => {
      console.log("acc", acc);
      const findCart = acc.find((sub) => sub?.product._id === item.product._id);
      if (findCart) {
        const data = {
          quantity: item.quantity,
          _id: item._id,
          image: item.product.image,
          name: item.product.name,
          productId: item.product._id,
          price: item.product.price,
          discount: item.product.discount,
          attribute: item.attribute,
          discountPercentage: item.discountPercentage,
          createdAt: item.createdAt,
          slug: item.product.slug,
          totalQuantity: item.attribute.quantity,
        };
        findCart.items.push(data);
        return acc;
      }
      console.log("findCart", findCart);

      const listAttribute = item.product.attribute || [];
      let listColor = [];
      let listSize = [];
      if (item?.product.attribute) {
        listColor = listAttribute.reduce((acc, item) => {
          let group = acc.find(
            (g) => g.colorId.toString() === item.colorId._id.toString()
          );

          if (!group) {
            group = {
              colorId: item.colorId._id,
              colorName: item.colorId.name,
              colorCode: item.colorId.code,
              list: [item],
              quantity: item.quantity,
            };
            acc.push(group);
            return acc;
          }
          group.list.push(item);
          group.quantity += item.quantity;
          return acc;
        }, []);
        console.log(" list color", listColor);
        listSize = listAttribute.reduce((acc, item) => {
          console.log("acc list size", acc);
          let group = acc.find(
            (g) => g.sizeId.toString() === item.sizeId._id.toString()
          );
          if (!group) {
            group = {
              sizeId: item.sizeId._id,
              sizeName: item.sizeId.name,
              list: [item],
              quantity: item.quantity,
            };
            acc.push(group);
            return acc;
          }
          group.list.push(item);
          group.quantity += item.quantity;
          return acc;
        }, []);
      }

      const result = {
        product: item.product,
        attribute: item.attribute,
        listColor: listColor,
        listSize: listSize,
        items: [
          {
            quantity: item.quantity,
            _id: item._id,
            image: item.product.image,
            name: item.product.name,
            productId: item.product._id,
            price: item.product.price,
            discount: item.product.discount,
            attribute: item.attribute,
            discountPercentage: item.discountPercentage,
            createdAt: item.createdAt,
            slug: item.product.slug,
            totalQuantity: item.attribute.quantity,
          },
        ],
        createAt: item.createAt,
      };
      return [...acc, result];
    }, []);
    return res.status(STATUS.OK).json({
      message: "Danh sách giỏ hàng",
      data: listData,
    });
  } catch (error) {
    return res.status(STATUS.INTERNAL).json({
      message: error.message,
    });
  }
};
