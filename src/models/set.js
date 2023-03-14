const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  name: String,
  articleNumber: String,
  purchasePrice: String,
  salePrice: String
});

module.exports = mongoose.model('Set', setSchema);
