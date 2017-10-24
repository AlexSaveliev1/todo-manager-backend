const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: Number,
  title: String,
  dueDate: Number,
  createdAt: Number,
  finishedAt: Number,
  updatedAt: Number,
  deletedAt: Number,
  priority: Number,
  order: Number,
  group: { type: mongoose.Schema.Types.Number, ref: 'group' }
});

module.exports = schema;
