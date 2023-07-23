// upload.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const uploadSchema = new Schema({
  name: { type: String },
  parent: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  parent_list: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
  imageUrl: { type: String, default: null },
  isFile: { type: Boolean, default: false },
});

module.exports = mongoose.model("Upload", uploadSchema);
