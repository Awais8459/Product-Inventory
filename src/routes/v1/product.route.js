const express = require("express");
const  {productController}  = require("../../controllers");

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
        .post(productController.createProducts)
        .delete(productController.deleteMultipleProducts);

router.route('/:id')
        .get(productController.getProductById)
        .patch(productController.updateProductById)
        .delete(productController.deleteProduct);

router.post('/upload', productController.uploadImages);

module.exports = router;

