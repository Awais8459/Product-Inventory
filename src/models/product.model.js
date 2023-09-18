const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const {category} = require('../config/category')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    quantity: {
        type: String,
        required: true,
        trim: true,
      },
      category: {
        type: String,
        required: true,
        enum: category,
        trim: true
      }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
/**
 * @typedef Product
 */
const Product = mongoose.model('Product', userSchema);

module.exports = Product;
