const Order = require("./orderModel");
const Cart = require("../cart/cartModel");

exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log({ userId });

    const orders = await Order.find({ user: userId }).exec();
    res.status(201).json(orders);
  } catch (error) {
    console.log(error);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cartItems, totalAmount } = req.body;

    console.log({ totalAmount });

    const products = [];
    for (let i = 0; i < cartItems.length; i++) {
      const _id = cartItems[i].product._id;
      const quantity = cartItems[i].quantity;

      const orderobj = { _id, quantity };

      products.push(orderobj);
    }
    // console.log(products);

    const order = await new Order({
      totalAmount,
      products,
      user: userId, //this one will change dynamically
    }).save();
    const deleteAllCartItems = await Cart.deleteMany({
      user: userId,
    }).exec();
    // console.log(deleteAllCartItems);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
