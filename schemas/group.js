const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: Number,
  title: String,
  tasks: Array
});

module.exports = schema;
