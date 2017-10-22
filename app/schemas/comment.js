const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: Number,
  text: String,
  task: Number,
  createdAt: Number,
  updatedAt: Number,
  deletedAt: Number
});

module.exports = schema;
