const ProductCategory = require("./productCategoryModel");

const createProductCategory = async (req, res) => {
  //   console.log(req.file);

  console.log("uploade-location=====>", req.file.location);
  //   console.log(req.body.name);
  let CategoryObj = {};

  for (cat in req.body) {
    // console.log(cat);
    CategoryObj[cat] = req.body[cat];
  }
  CategoryObj.image = req.file.location;
  try {
    const Category = await new ProductCategory(CategoryObj).save();

    res.status(201).json(Category);
  } catch (error) {}
};

const getProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find({ status: "approved" })
      .populate("parentCategory")
      .exec();

    res.status(201).json(categories);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

const updateProductCategory = async (req, res) => {
  const { id } = req.params;

  let CategoryObj = {};

  for (cat in req.body) {
    // console.log(cat);
    CategoryObj[cat] = req.body[cat];
  }
  try {
    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      CategoryObj,
      { new: true }
    ).exec();
    res.status(201).json(updatedCategory);
  } catch (error) {}
};

const deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });
    const productcategory = await ProductCategory.findByIdAndUpdate(
      { _id: id },
      {
        status: "deleted",
      },
      { new: true }
    ).exec();
    res.status(201).json(productcategory);
  } catch (error) {}
};

const createFeaturedCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await ProductCategory.findById(id).exec();

    const isFeatured = () => {
      return feature.featured;
    };

    const category = await ProductCategory.findByIdAndUpdate(
      id,
      {
        featured: isFeatured() ? false : true,
      },
      { new: true }
    ).exec();
    res.status(201).json(category);
  } catch (error) {}
};

module.exports = {
  createProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
  createFeaturedCategory,
};
