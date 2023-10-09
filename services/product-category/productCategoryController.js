const productCategory = require("./productCategoryModel");

const createProductCategory = async (req, res) => {
  //   console.log(req.file);

  //   console.log("uploade-location=====>", req.file.location);
  //   console.log(req.body.name);
  let CategoryObj = {};

  for (cat in req.body) {
    // console.log(cat);
    CategoryObj[cat] = req.body[cat];
  }

  try {
    const Category = await new productCategory(CategoryObj).save();

    res.status(201).json(Category);
  } catch (error) {}
};

const getProductCategories = async (req, res) => {
  try {
    const categories = await productCategory
      .find()
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
    const updatedCategory = await productCategory
      .findByIdAndUpdate(id, CategoryObj, { new: true })
      .exec();
    res.status(201).json(updatedCategory);
  } catch (error) {}
};

module.exports = {
  createProductCategory,
  getProductCategories,
  updateProductCategory,
};
