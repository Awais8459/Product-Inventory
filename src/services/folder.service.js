const {Folder, Image} = require('../models');

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

exports.deleteFolder = async (folderId) => {
  // Find the folder to delete
  const folderToDelete = await Folder.findById(folderId);

  if (!folderToDelete) {
    throw new Error('Folder not found');
  }

  // Get all child folders recursively
  const childFolders = await Folder.find({ parent_list: folderId });

  const images = await Image.find({ parent: folderId });

    // Delete images within the folder
    for (const image of images) {
      await Image.findByIdAndDelete(image._id);
    }

  // Delete child folders recursively
  for (const childFolder of childFolders) {
    await deleteFolderAndChildren(childFolder._id);
  }

  // Delete the current folder
  await Folder.findByIdAndDelete(folderId);

};

async function deleteFolderAndChildren(folderId) {
  // Get all child folders recursively
  const childFolders = await Folder.find({ parent_list: folderId });

  // Delete child folders recursively
  for (const childFolder of childFolders) { 
    await deleteFolderAndChildren(childFolder._id);
  }
  // Delete the current folder
  await Folder.findByIdAndDelete(folderId);
}

