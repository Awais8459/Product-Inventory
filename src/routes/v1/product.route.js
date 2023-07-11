const express = require("express");
const { productController } = require("../../controllers");

const router = express.Router();

const underCnstruction = async(req,res,next) =>{
    try {
        res.status(200).json({
            success:true,
            apiEndpoint: req.baseUrl,
            message: "this api is under construction"
        })
    } catch (error) {
        next(error)
    }
}

router.route('/')
        .get(productController.getProducts)
        .post(productController.createProduct)
        .delete(productController.deleteMultipleProducts);
router.route('/:id')
        .get(productController.getProductById)
        .patch(productController.updateProduct)
        .delete(productController.deleteProduct);

// router.route('/delete-many')
//         .delete(productController.deleteManyProducts);

// router.get('/', productController.getProducts);
// router.get('/:id', productController.getProductById);
// router.post('/', productController.createProduct);
// router.patch('/:id', productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);
// router.delete('/', productController.deleteMultipleProducts);

module.exports = router;

