const mongoose = require('mongoose');

const figureSchema = new mongoose.Schema({
  name: String,
  articleNumber: String,
  topic: String,
  purchasePrice: Number,
  salePrice: Number,
  // itemImage: fileHandle[],
});

module.exports = mongoose.model('Figure', figureSchema);
