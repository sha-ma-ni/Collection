const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  name: String,
  articleNumber: String,
  purchasePrice: Number,
  salePrice: Number
});

module.exports = mongoose.model('Set', setSchema);
