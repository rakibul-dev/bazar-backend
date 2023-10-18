const Wishlist = require("./wishlistModel");

exports.getWishlistItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const getItems = await Wishlist.find({ user: userId }).exec();
    res.json(getItems);
  } catch (error) {}
};

exports.addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { product } = req.body;

    const itemExist = await Wishlist.findOne({ user: userId, product }).exec();

    if (itemExist) {
      console.log("exist");
      res.json(itemExist);
    } else {
      const wishlist = await new Wishlist({
        user: userId,
        product,
      }).save();
      res.json(wishlist);
    }
  } catch (error) {}
};

exports.deleteWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Wishlist.findOneAndDelete({
      _id: id,
    }).exec();
    res.json(deletedItem);
  } catch (error) {}
};
