const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: Number,
  text: String,
  task: Number
});

module.exports = schema;
