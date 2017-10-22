const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  subTaskSchema = require('../schemas/subtask'),
  config = require('../config'),
  { db } = config,
  connection = mongoose.connect(`mongodb://${db.host}/${db.name}`);

mongoose.Promise = global.Promise;

autoIncrement.initialize(connection);
subTaskSchema.plugin(autoIncrement.plugin, 'subtask');

let subTaskModel = mongoose.model('subtask', subTaskSchema);

module.exports = subTaskModel;
