const imageService = require('../services/image.service');
const path = require('path');

const uploadImage = async (req, res) => {
  try {
    const { parentId } = req.params;
    const { filename, originalname } = req.file;
    const imageUrl = `http://localhost:3000/v1/images/upload/${filename}`;

    const image = await imageService.uploadImage(originalname, parentId, imageUrl);
    res.status(201).json({ image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

module.exports = { uploadImage };
