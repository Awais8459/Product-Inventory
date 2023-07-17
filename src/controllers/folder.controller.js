const folderService = require('../services/folder.service');
//
const path = require("path");

  exports.createFolder = async (req, res) => {
    try {
      const { name , parentIdList } = req.body;
      const folder = await folderService.createFolder(name, parentIdList);
      res.status(201).json({ folder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create folder' });
    }
  };

 exports.uploadFolder = async (req, res) => {
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

  exports.deleteFolder = async (req, res) => {
    try {
      const { folderId } = req.params;
      await folderService.deleteFolder(folderId);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete folder' });
    }
  };

