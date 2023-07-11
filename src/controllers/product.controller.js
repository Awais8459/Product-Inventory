// const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
// const catchAsync = require('../utils/catchAsync');
// const { productService } = require('../services');


// const createProduct = catchAsync(async (req, res) => {
//     const product = await productService.createProduct(req.body);
//     res.status(httpStatus.CREATED).send(product);
//   });

// const createProducts = catchAsync(async (req, res) => {
//     const product = await productService.createProducts(req.body.productsArray);
//     res.status(httpStatus.CREATED).send(product);
//   });

//   const getProducts = catchAsync(async (req, res) => {
//     const filter = pick(req.query, ['name', 'role']);
//     const options = pick(req.query, ['sortBy', 'limit', 'page']);
//     const result = await productService.queryUsers(filter, options);
//     res.send(result);
//   });
  
//   const getProduct = catchAsync(async (req, res) => {
//     const product = await productService.getProductById(req.params.userId);
//     if (!product) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//     }
//     res.send(product);
//   });
  
//   const updateProduct = catchAsync(async (req, res) => {
//     const product = await productService.updateProductById(req.params.userId, req.body);
//     res.send(product);
//   });
  
//   const deleteProduct = catchAsync(async (req, res) => {
//     await productService.deleteProductById(req.params.productIds);
//     res.status(httpStatus.NO_CONTENT).send();
//   });
//   const deleteManyProducts = catchAsync(async (req, res) => {
//     const ids = req.body.ids;
//     await productService.deleteManyProductsByIds(ids);
//     res.status(httpStatus.OK).json({ message: 'Products deleted successfully' });
//   });
  
  


//   module.exports = {
//     createProduct,
//     createProducts,
//     getProducts,
//     getProduct,
//     updateProduct,
//     deleteProduct,
//     deleteManyProducts,
//   };


const productService = require('../services/product.service');

exports.getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMultipleProducts = async (req, res) => {
  try {
    const deletedCount = await productService.deleteMultipleProducts(req.body.ids);
    res.status(200).json({ message: `${deletedCount} products deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
