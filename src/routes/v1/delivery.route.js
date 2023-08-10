const express = require('express');
const deliveryController = require('../../controllers/delivery.controller');

const router = express.Router();

router.post('/create/:role/:userId', deliveryController.createDelivery);// for fetching customer ID
router.post('/create/:role/:userId', deliveryController.createDelivery);

module.exports = router;