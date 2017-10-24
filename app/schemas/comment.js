const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: Number,
  body: String,
  createdAt: Number,
  task: { type: mongoose.Schema.Types.Number, ref: 'task' }
});

module.exports = schema;
