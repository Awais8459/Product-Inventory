const router = require("express").Router();
const imageController = require('../../controllers/image.controller');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Multer upload instance
const upload = multer({ storage });

// Define the route for uploading an image
router.post("/upload/:parentId", upload.array('image', 10), imageController.uploadImages);

router.get("/view/:imageName", imageController.viewImage);
router.delete("/delete/:imageId", imageController.deleteImage);
module.exports = router;
