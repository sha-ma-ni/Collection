const mongoose = require('mongoose');

const figureSchema = new mongoose.Schema({
  name: String,
  articleNumber: String,
  topic: String,
  purchasePrice: String,
  salePrice: String,
  // itemImage: fileHandle[],
});

module.exports = mongoose.model('Figure', figureSchema);
