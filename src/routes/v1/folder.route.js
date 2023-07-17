const router = require("express").Router();
const folderController = require('../../controllers/folder.controller');
//
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" }); // Destination folder for uploaded images
//

// Define the routes for creating and uploading folders
router.post("/", folderController.createFolder); // Create a new folder at the root level
router.post("/upload/:parentId", folderController.uploadFolder); // Upload a new folder inside an existing folder
//
// router.post("/uploadImage/:parentId", upload.single("image"), folderController.uploadImage); // Upload a new image inside an existing folder
//
module.exports = router;
