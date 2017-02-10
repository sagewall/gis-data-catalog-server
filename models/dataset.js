const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DatasetSchema = new Schema({
  name: String,
  date: Date,
  about: String,
  downloadUrl: String,
  dynamicMapLayer: String,
  lat: Number,
  lon: Number,
  zoom: Number
});

module.exports = mongoose.model('Dataset', DatasetSchema);