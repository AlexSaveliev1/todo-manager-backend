const mongoose = require('mongoose');

let schema = mongoose.Schema({
  title: String,
  tasks: [{type: mongoose.Schema.Types.Number, ref: 'task'}],
});

module.exports = schema;
