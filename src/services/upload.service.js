const { Folder, Image } = require('../models');

exports.uploadImage = async (name, parentId, imageUrl) => {
  const parentFolder = await Folder.findById(parentId);
  if (!parentFolder) {
    throw new Error('Parent folder not found');
  }
  const image = new Image({ name, parent: parentId, parent_list: [...parentFolder.parent_list, parentId], imageUrl });
  return await image.save();
};

exports.uploadFolder = async (name, parentId) => {
  const parentFolder = await Folder.findById(parentId);
  if (!parentFolder) {
    throw new Error('Parent folder not found');
  }
  const folder = new Folder({ name, parent: parentId, parent_list: [...parentFolder.parent_list, parentId] });
  return await folder.save();
};
