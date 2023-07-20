const imageService = require('../services/image.service');
const path = require('path');

const uploadImages = async (req, res) => {
  try {
    const { parentId } = req.params;
    const files = req.files;
    const imageUrls = [];
    const imageDetails = [];

    for (const file of files) {
      const { filename, originalname } = file;
      const imageUrl = `http://localhost:3000/v1/images/view/${filename}`;

      const image = await imageService.uploadImage(originalname, parentId, imageUrl);
      // imageUrls.push(image.imageUrl);

      const imageInfo = {
        id: image._id, 
        name: image.name,
        parent: image.parent,
        parent_list: image.parent_list,
        imageUrl: image.imageUrl
      };

      imageDetails.push(imageInfo)
    }

    // res.status(201).json({ imageUrls });
    res.status(201).json(imageDetails)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};

const viewImage = (req, res) => {
    try {
      const imageName = req.params.imageName;
      const imagePath = path.join(__dirname, `../../public/uploads/${imageName}`);
      res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to view image' });
    }
  };

  const deleteImage = async (req, res) => {
    try {
      const imageId = req.params.imageId;
      await imageService.deleteImage(imageId);
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete image' });
    }
  };

module.exports = { uploadImages, viewImage, deleteImage };
