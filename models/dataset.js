const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  name: String,
  date: Date,
  about: String,
  tags: [String],
  downloadUrl: String,
  dynamicMapLayer: String,
  lat: Number,
  lon: Number,
  zoom: Number
});

module.exports = mongoose.model('Dataset', datasetSchema);