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

// exports.createFolder = async (name, parent_list) => {
//   const newFolder = await Folder.create({
//     name: name,
//     parent: parentId,
//     parent_list: [],
//   });
//   return newFolder;
// };

// exports.createFolder = async (name, parentId) => {
//   const newFolder = new Folder({
//     name: name,
//     parent: parentId,
//     parent_list: [],
//   });
//   return await newFolder.save();
// };


// exports.deleteFolder = async (folderId) => {
//   // Find the folder to delete
//   const folderToDelete = await Folder.findById(folderId);

//   if (!folderToDelete) {
//     throw new Error('Folder not found');
//   }

  // Delete the folder and its children recursively
//   exports.deleteFolder = async (folderId) => {
//     const folderToDelete = await Folder.findById(folderId);
  
//     if (!folderToDelete) {
//       throw new Error('Folder not found');
//     }
  
//     await deleteFolderAndChildren(folderToDelete);
  
//     // Delete the current folder
//     await Folder.findByIdAndDelete(folderId);
//   };
  
//   async function deleteFolderAndChildren(folder) {
//     // Delete children folders recursively
//     for (const childId of folder.parent_list) {
//       const childFolder = await Folder.findById(childId);
//       if (childFolder) {
//         await deleteFolderAndChildren(childFolder);
//         await Folder.findByIdAndDelete(childFolder._id);
//       }
//     }
//   } 
// }


exports.deleteFolder = async (folderId) => {
  // Find the folder to delete
  const folderToDelete = await Folder.findById(folderId);

  if (!folderToDelete) {
    throw new Error('Folder not found');
  }

  // Get all child folders recursively
  const childFolders = await Folder.find({ parent_list: folderId });

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
