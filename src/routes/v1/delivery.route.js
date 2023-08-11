const express = require('express');
const deliveryController = require('../../controllers/delivery.controller');

const router = express.Router();

//which customer chooses product

router.post('/create/:role/:userId', deliveryController.createDelivery);// for fetching customer ID
router.post('/create/:role/:userId', deliveryController.createDelivery); //product id

module.exports = router;