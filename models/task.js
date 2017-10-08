
const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  taskSchema = require('../schemas/task'),
  db = 'todomanager',
  connection = mongoose.connect(`mongodb://localhost/${db}`);

autoIncrement.initialize(connection);
taskSchema.plugin(autoIncrement.plugin, 'task');

let taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;
