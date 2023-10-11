const Brand = require("../brand/brandModel");

exports.createBrand = async (req, res) => {
  const { name } = req.body;
  const { location } = req.file;
  //   console.log(req.file);

  try {
    const brand = await new Brand({ name, image: location }).save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};
exports.getBrands = async (req, res) => {
  //   const { page, limit } = req.query;
  try {
    const status = req.query?.status || "approved";
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;
    const totalCount = await Brand.countDocuments({ status });
    const totalPages = Math.ceil(totalCount / perPage);
    const brands = await Brand.find({ status })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(201).json({
      brands,
      pagination: {
        page,
        per_page: perPage,
        total_items: totalCount,
        total_pages: totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};
exports.getBrand = async (req, res) => {};
exports.updateBrand = async (req, res) => {};

exports.deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBrand = await Brand.findByIdAndUpdate(
      id,
      {
        status: "deleted",
      },
      { new: true }
    );
    res.status(201).json(deletedBrand);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};
