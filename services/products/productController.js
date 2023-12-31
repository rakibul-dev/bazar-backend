const Product = require("./productModel");

const createProduct = async (req, res) => {
  //   console.log("uploade-location=====>", req);
  console.log(req.body);
  try {
    let productObj = {};

    for (prod in req.body) {
      productObj[prod] = req.body[prod];
    }
    // productObj.image = req.files.location;
    const images = [];
    req.files.forEach((element) => {
      images.push(element.location);
    });
    productObj.image = images;
    console.log(productObj);

    const product = await new Product(productObj).save();
    // console.log(product);

    res.status(201).json(product);
  } catch (error) {
    // res.status(500).json(error);
    console.log(error);
    // res.status(500).json("An error occurred.");
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  let productObj = {};

  for (prod in req.body) {
    productObj[prod] = req.body[prod];
  }

  try {
    const product = await Product.findByIdAndUpdate(id, productObj, {
      new: true,
    }).exec();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const product = await Product.find().populate(["category", "brand"]).exec();

    res.status(201).json(product);
  } catch (error) {
    // res.status(500).json(error);
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate(["category", "brand"])
      .exec();
    res.json(product);
  } catch (error) {}
};

const updateProductVariant = async (req, res) => {
  const { productId, variantId } = req.params;
  const { variant } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId, "variants._id": variantId }, // Use both product and variant ID for matching
      { $set: { "variants.$": variant } }, // Update the matched variant
      { new: true }
    );

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProductVariant = async (req, res) => {
  const { productId, variantId } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: {
          variants: { _id: variantId },
        },
      },
      { new: true }
    ).exec();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addNewProductVraiant = async (req, res) => {
  const { productId, variantId } = req.params;
  const { variant } = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      {
        $push: { variants: variant },
      },
      { new: true }
    ).exec();
    console.log(product);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  updateProductVariant,
  deleteProductVariant,
  addNewProductVraiant,
  getProduct,
};
