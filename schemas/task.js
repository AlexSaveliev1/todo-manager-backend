const mongoose = require('mongoose');

let schema = mongoose.Schema({
  title: String,
  dueTime: Number,
  createdAt: Number,
  finishedAt: Number,
  updatedAt: Number,
  deletedAt: Number,
  done: Boolean,
  subtasks: Array
});

module.exports = schema;
