const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the Folder model
const folderSchema = new Schema({
  name: { type: String },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
  parent_list: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
});
module.exports = mongoose.model('Folder', folderSchema);