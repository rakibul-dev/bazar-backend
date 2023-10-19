const Cart = require("./cartModel");

// exports.addToCart = async (req, res) => {
//   //   console.log({ cartItems, userId });
//   try {
//     const { userId } = req.params;
//     const { cartItems } = req.body;
//     const isCart = await Cart.findOne({ user: userId }).exec();

//     if (isCart) {
//       console.log("cart exists");
//       isCart.items = cartItems;
//       await isCart.populate("items");
//       await isCart.save();
//       res.json(isCart);
//     } else {
//       //   console.log("cart not exists");
//       //   Cart.init();
//       const cart = new Cart({ user: userId });
//       //   // .then((doc) => doc.populate("items"));
//       cart.items = cartItems;
//       await cart.save();
//       //   // cart.populate("items");
//       res.json(cart);

//       //   const cart = new Cart(user);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.removeCartItem = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { itemId } = req.body;

//     const cart = await Cart.findOne({ user: userId }).exec();

//     cart.items.pop(Number(itemId));

//     res.status(200).json(cart);
//   } catch (error) {
//     console.log(error);
//   }
// };
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ user: userId })
      .populate("product")
      .exec();
    res.json(cartItems);
  } catch (error) {}
};

exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { product, quantity } = req.body;

  //   console.log({product , userId });

  const isAlreadyinCart = await Cart.findOne({ user: userId, product })
    .populate("product")
    .exec();

  try {
    if (isAlreadyinCart) {
      res.json(isAlreadyinCart);
    } else {
      const cart = await new Cart({
        user: userId,
        product,
        quantity: 1,
      })
        .save()
        .then((item) => item.populate("product"));

      res.json(cart);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findByIdAndDelete(id).exec();
    res.json(cartItem);
  } catch (error) {
    console.log(error);
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      { _id: id },
      { quantity },
      { new: true }
    ).exec();
    res.json(cartItem);
  } catch (error) {
    console.log(error);
  }
};
