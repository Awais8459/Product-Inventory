const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  name: { type: String },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
  parent_list: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
  imageUrl: { type: String }
});

module.exports = mongoose.model('Image', imageSchema);
