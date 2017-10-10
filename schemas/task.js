const mongoose = require('mongoose');

let schema = mongoose.Schema({
  title: String,
  dueDate: Number,
  createdAt: Number,
  finishedAt: Number,
  updatedAt: Number,
  deletedAt: Number,
  subtasks: Array
});

module.exports = schema;
