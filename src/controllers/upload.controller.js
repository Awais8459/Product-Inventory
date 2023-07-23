// const uploadService = require('../services/upload.service');
// const path = require('path');

// exports.uploadFiles = async (req, res) => {
//   try {
//     const { parentId } = req.params;
//     const files = req.files;
//     const uploadedItems = [];

//     if (files && files.length > 0) {
//       // Image Upload
//       for (const file of files) {
//         const { filename, originalname, mimetype, size } = file;
//         const imageUrl = `http://localhost:3000/v1/images/view/${filename}`;
//         const image = await uploadService.uploadImage(originalname, parentId, imageUrl);
//         uploadedItems.push({
//           type: 'image',
//           id: image._id,
//           name: image.name,
//           parent: image.parent,
//           parent_list: image.parent_list,
//           imageUrl: image.imageUrl
//         });
//       }
//     } else {
//       // Folder Upload
//       const folderName = req.body.name;
//       if (!folderName) {
//         throw new Error('Folder name missing in the request body');
//       }

//       const folder = await uploadService.uploadFolder(folderName, parentId);
//       uploadedItems.push({
//         type: 'folder',
//         id: folder._id,
//         name: folder.name,
//         parent: folder.parent,
//         parent_list: folder.parent_list,
//       });
//     }

//     res.status(201).json(uploadedItems);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const uploadService = require('../services/upload.service');
const path = require('path');

exports.uploadFiles = async (req, res) => {
  try {
    const { parentId } = req.params;
    const files = req.files;
    const uploadedItems = [];

    if (files && files.length > 0) {
      // Image Upload
      for (const file of files) {
        const { filename, originalname, mimetype, size } = file;
        const imageUrl = `http://localhost:3000/v1/images/view/${filename}`;
        const image = await uploadService.uploadImage(originalname, parentId, imageUrl);
        uploadedItems.push({
          type: 'image',
          id: image._id,
          name: image.name,
          parent: image.parent,
          parent_list: image.parent_list,
          imageUrl: image.imageUrl
        });
      }
    } else {
      // Folder Upload
      const folderName = req.body.name;
      if (!folderName) {
        throw new Error('Folder name missing in the request body');
      }

      const folder = await uploadService.uploadFolder(folderName, parentId);
      uploadedItems.push({
        type: 'folder',
        id: folder._id,
        name: folder.name,
        parent: folder.parent,
        parent_list: folder.parent_list,
      });
    }

    res.status(201).json(uploadedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
