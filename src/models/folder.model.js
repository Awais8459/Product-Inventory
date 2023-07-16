const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the Folder model
const folderSchema = new Schema({
  name: { type: String },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
  parent_list: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
});

//
const imageSchema = new Schema({
  name: { type: String },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder' },
  parent_list: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
  imageUrl: { type: String },
});
//

module.exports = mongoose.model('Folder', folderSchema);
//
// const Folder = mongoose.model('Folder', folderSchema);
const Image = mongoose.model('Image', imageSchema);
module.exports = { Image };
//