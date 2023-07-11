const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Product } = require('../models');
/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<product>}
 */
const createProduct = async (productData) => {
    return await Product.create(productData);
  };
const createProducts = async (productsArray) => {
  return Product.insertMany(productsArray);
};
// const createProducts = await productService.createProducts(req.body.productsArray);

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const products = await product.paginate(filter, options);
  return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<product>}
 */

const getProductById = async (id) => {
    return await Product.findById(id);
  };
  

/**
 * Get product by email
 * @param {string} email
 * @returns {Promise<product>}
 */

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<product>}
 */

const updateProductById = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  };

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<product>}
 */
const deleteProductById = async (id) => {
    return await Product.findByIdAndRemove(id);
  };


const deleteMultipleProducts = async (ids) => {
    return await Product.deleteMany({ _id: { $in: ids } });
  };
  
  
  

module.exports = {
  createProduct,
  createProducts,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteMultipleProducts,
};

