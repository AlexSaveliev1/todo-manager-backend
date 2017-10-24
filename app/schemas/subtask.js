const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: Number,
  title: String,
  createdAt: Number,
  finishedAt: Number,
  updatedAt: Number,
  deletedAt: Number,
  task: { type: mongoose.Schema.Types.Number, ref: 'task' }
});

module.exports = schema;
