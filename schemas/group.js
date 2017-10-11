const mongoose = require('mongoose');

let schema = mongoose.Schema({
  title: String,
  createdAt: Number,
  updatedAt: Number,
  deletedAt: Number
});

module.exports = schema;
