// const {Folder, Image} = require('../models');

// exports.createFolder = async (name, parentIdList) => {
//   const folder = new Folder({ name, parent_list: parentIdList });
//   return await folder.save();
// };

// exports.uploadFolder = async (name, parentId) => {
//   const parentFolder = await Folder.findById(parentId);
//   if (!parentFolder) {
//     throw new Error('Parent folder not found');
//   }
//   const folder = new Folder({ name, parent: parentId, parent_list: [...parentFolder.parent_list, parentId] });
//   return await folder.save();
// };

// exports.deleteFolder = async (folderId) => {
//   // Find the folder to delete
//   const folderToDelete = await Folder.findById(folderId);

//   if (!folderToDelete) {
//     throw new Error('Folder not found');
//   }

//   // Get all child folders recursively
//   const childFolders = await Folder.find({ parent_list: folderId });

//   const images = await Image.find({ parent: folderId });

//     // Delete images within the folder
//     for (const image of images) {
//       await Image.findByIdAndDelete(image._id);
//     }

//   // Delete child folders recursively
//   for (const childFolder of childFolders) {
//     await deleteFolderAndChildren(childFolder._id);
//   }

//   const imagesToDelete = await Image.find({ parent_list: folderId });
//   for (const image of imagesToDelete) {
//     await Image.findByIdAndDelete(image._id);
//   }

//   // Delete the current folder
//   await Folder.findByIdAndDelete(folderId);

// };

// async function deleteFolderAndChildren(folderId) {
//   // Get all child folders recursively
//   const childFolders = await Folder.find({ parent_list: folderId });

//   // Delete child folders recursively
//   for (const childFolder of childFolders) { 
//     await deleteFolderAndChildren(childFolder._id);
//   }
//   // Delete the current folder
//   await Folder.findByIdAndDelete(folderId);
// }

const { Folder, Image } = require('../models');

exports.createFolder = async (name, parentIdList) => {
  const folder = new Folder({ name, parent_list: parentIdList });
  return await folder.save();
};

exports.uploadFolder = async (name, parentId) => {
  const parentFolder = await Folder.findById(parentId);
  if (!parentFolder) {
    throw new Error('Parent folder not found');
  }
  const folder = new Folder({
    name,
    parent: parentId,
    parent_list: [...parentFolder.parent_list, parentId],
  });
  return await folder.save();
};

exports.deleteFolder = async (folderId) => {
  const folderToDelete = await Folder.findById(folderId);

  if (!folderToDelete) {
    throw new Error('Folder not found');
  }

  // Find all child folders recursively
  const childFolderIds = await getAllChildFolderIds(folderId);

  // Find all images associated with the folder and its children
  const imagesToDelete = await Image.find({
    $or: [{ parent: folderId }, { parent: { $in: childFolderIds } }],
  });

  // Delete images
  await Image.deleteMany({ _id: { $in: imagesToDelete.map((image) => image._id) } });

  // Delete the current folder and its children
  await Folder.deleteMany({ _id: { $in: [...childFolderIds, folderId] } });
};

async function getAllChildFolderIds(folderId) {
  const childFolders = await Folder.find({ parent_list: folderId });
  let childFolderIds = [];

  for (const childFolder of childFolders) {
    childFolderIds.push(childFolder._id);
    const grandChildIds = await getAllChildFolderIds(childFolder._id);
    childFolderIds = childFolderIds.concat(grandChildIds);
  }

  return childFolderIds;
}
