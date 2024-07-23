// productSchema.js

const mongoose = require('mongoose');

// Product Category Schema
const productCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

// Product Schema


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  availability: { type: Number, required: true },
  productCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendors', 
  },
});


const Product = mongoose.model('Product', productSchema);

module.exports = {
  ProductCategory,
  Product,
};
