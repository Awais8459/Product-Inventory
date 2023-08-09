const router = require("express").Router();
const riderController = require('../../controllers/rider.Controller');

router.get("/customer/location", riderController.customerLocation); // Create a new folder at the root level
router.get("/retailer/location", riderController.retailerLocation); // Upload a new folder inside an existing folder

router.get("/rider/location", riderController.riderLocation);

module.exports = router;