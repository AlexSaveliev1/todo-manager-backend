const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: Number,
  title: String,
  createdAt: Number,
  updatedAt: Number,
  deletedAt: Number
});

module.exports = schema;
