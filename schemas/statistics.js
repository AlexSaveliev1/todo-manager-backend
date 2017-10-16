const mongoose = require('mongoose');

let schema = mongoose.Schema({
  id: Number,
  total: Number,
  completed: Number,
  summaryEstimated: Number,
  summaryRemaining: Number
});

module.exports = schema;
