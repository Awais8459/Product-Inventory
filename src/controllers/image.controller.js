const imageService = require('../services/image.service');
const path = require('path');

const uploadImage = async (req, res) => {
  try {
    const { parentId } = req.params;
    const { filename, originalname } = req.file;
    const imageUrl = `http://localhost:3000/v1/images/view/${filename}`;

    const image = await imageService.uploadImage(originalname, parentId, imageUrl);
    res.status(201).json({ image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
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

module.exports = { uploadImage, viewImage, deleteImage };
