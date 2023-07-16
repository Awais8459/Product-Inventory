const {Folder, Image} = require('../models');


exports.createFolder = async (name, parentId) => {
  const newFolder = await Folder.create({
    name: name,
    parent: parentId,
    parent_list: [],
  });
  return newFolder;
};

exports.uploadFolder = async (name, parentId) => {
  const parentFolder = await Folder.findById(parentId);
  if (!parentFolder) {
    throw new Error('Parent folder not found');
  }
  const folder = new Folder({ name, parent: parentId, parent_list: [...parentFolder.parent_list, parentId] });
  return await folder.save();
};
//
exports.uploadImage = async (name, parentId, imageUrl) => {
  const parentFolder = await Folder.findById(parentId);
  if (!parentFolder) {
    throw new Error('Parent folder not found');
  }
  const image = await Image.create({
    name,
    parent: parentId,
    parent_list: [...parentFolder.parent_list, parentId],
    imageUrl,
  });
  return image;
};

//