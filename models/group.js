const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  groupSchema = require('../schemas/group'),
  db = 'todomanager',
  connection = mongoose.connect(`mongodb://localhost/${db}`);

autoIncrement.initialize(connection);
groupSchema.plugin(autoIncrement.plugin, 'group');

let groupModel = mongoose.model('group', groupSchema);

module.exports = groupModel;
