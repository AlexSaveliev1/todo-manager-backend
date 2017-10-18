const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  taskSchema = require('../schemas/task'),
  config = require('../config'),
  { db } = config,
  connection = mongoose.connect(`mongodb://${db.host}/${db.name}`);

autoIncrement.initialize(connection);
taskSchema.plugin(autoIncrement.plugin, 'task');

let taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;
