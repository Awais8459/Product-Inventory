const folderService = require('../services/folder.service');
//
const path = require("path");
//
const createFolder = async (req, res) => {
    try {
      const { name , parent_list } = req.body;
      const folder = await folderService.createFolder(name, parent_list);
      res.status(201).json({ folder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create folder' });
    }
  };
 const uploadFolder = async (req, res) => {
    try {
      const { parentId } = req.params;
      const { name } = req.body;
      const folder = await folderService.uploadFolder(name, parentId);
      res.status(201).json({ folder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload folder' });
    }
  };
//
const uploadImage = async (req, res) => {
  try {
    const { parentId } = req.params;
    const { originalname, filename } = req.file;
    const imageUrl = `${req.protocol}://${req.get("host")}/public/upload/${filename}`;
    const image = await folderService.uploadImage(originalname, parentId, imageUrl);
    res.status(201).json({ image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};
//
  module.exports = {createFolder, uploadFolder, uploadImage}


