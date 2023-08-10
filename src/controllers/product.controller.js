const multer = require("multer");
const productService = require('../services/product.service');
const catchAsync = require('../utils/catchAsync');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductsById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
};


const createProducts = async (req, res) => {
  try {
    const product = await productService.createProducts(req.body.productsArray);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const product = await productService.updateProductById(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
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

const deleteMultipleProducts = async (req, res) => {
  try {
    const deletedCount = await productService.deleteMultipleProducts(req.body.ids);
    res.status(200).json({ message: `${deletedCount} products deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadImages = async (req, res) => {
    try {
      const images = req.files;
      const folder = req.body.folder;
      await service.uploadImages(images, folder);
      res.status(200).send('Images uploaded successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  const getProductsByCategory = async (req, res) => {
    try {
      const categoryName = req.params.categoryName;
      const products = await productService.getProductsByCategory(categoryName);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  module.exports = {
    createProduct,
    createProducts,
    getProducts,
    getProductById,
    updateProductById,
    deleteProduct,
    deleteMultipleProducts,
    uploadImages,
    getProductsByCategory
  };