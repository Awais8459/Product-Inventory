const router = require("express").Router();
const folderController = require('../../controllers/folder.controller');
const auth = require('../../middlewares/auth');;

// Define the routes for creating and uploading folders
router.post("/", folderController.createFolder); // Create a new folder at the root level
router.post("/upload/:parentId", folderController.uploadFolder); // Upload a new folder inside an existing folder

router.delete("/:folderId", folderController.deleteFolder);

module.exports = router;
