const {Folder, Image} = require('../models');


// exports.createFolder = async (name, parent_list) => {
//   const newFolder = await Folder.create({
//     name: name,
//     parent: parentId,
//     parent_list: [],
//   });
//   return newFolder;
// };
exports.createFolder = async (name, parentIdList) => {
  const folder = new Folder({ name, parent_list: parentIdList });
  return await folder.save();
};

exports.uploadFolder = async (name, parentId) => {
  const parentFolder = await Folder.findById(parentId);
  if (!parentFolder) {
    throw new Error('Parent folder not found');
  }
  const folder = new Folder({ name, parent: parentId, parent_list: [...parentFolder.parent_list, parentId] });
  return await folder.save();
};
// exports.createFolder = async (name, parentId) => {
//   const newFolder = new Folder({
//     name: name,
//     parent: parentId,
//     parent_list: [],
//   });
//   return await newFolder.save();
// };


// exports.uploadImage = async (name, parentId, imageUrl) => {
//   const parentFolder = await Folder.findById(parentId);
//   if (!parentFolder) {
//     throw new Error('Parent folder not found');
//   }
//   const image = await Image.create({
//     name,
//     parent: parentId,
//     parent_list: [...parentFolder.parent_list, parentId],
//     imageUrl,
//   });
//   return image;
// };

