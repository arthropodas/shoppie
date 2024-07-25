
const ProductCategory = require("./productSchema").ProductCategory; // Adjust path as needed
const Product = require("./productSchema").Product; // Adjust path as needed
const Vendor = require("../vendor-management/vendorSchema");
const shortid = require("shortid");
const asyncHandler = require("express-async-handler");
const validateId = require("./productsValidators");
const addProductCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new ProductCategory({ name });
    await newCategory.save();
    res.status(201).json({
      message: "Product category successfully registered",
      productCategory: newCategory,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to register product category",
      error: err.message,
    });
  }
});

const addProduct = asyncHandler(async (req, res, next) => {
  const { name, description, availability, productCategoryId, vendorId } =
    req.body;

  try {
    const shortUuid = shortid.generate();
    const productId = `PDT${shortUuid}`;
    console.log("vender id>>>>>>>>>>>>>>>>>>>", vendorId);
    const newProduct = new Product({
      name,
      productId,
      description,
      price: req.body.price,
      availability,
      //   productCategory: productCategoryId,
      vendor: vendorId,
    });
    console.log(("new product>>>>>>>>>>>>>>>>>>>>>>>>", newProduct));

    await newProduct.save();

    res.status(201).json({
      message: "Product successfully registered",
      product: newProduct,
    });
  } catch (err) {
    next(err);
  }
});
const getProductDetails = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.query;
    console.log("after getting");
    await validateId(productId);
    console.log("product id", productId);
    const product = await Product.findOne({ _id: productId })
      .populate({ path: "vendor", select: ["venderName"] })
      .exec();
    console.log("print product ", product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const productDetails = {
      productName: product.name,
      productPrice: product.price,
      availability: product.availability,
      vendor: product.vendor,
    };

    res.json(productDetails);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Failed to fetch product details", error: err.message });
  }
});
module.exports = {
  addProduct,
  addProductCategory,
  getProductDetails,
};
