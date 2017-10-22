const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  groupSchema = require('../schemas/group'),
  config = require('../config'),
  { db } = config,
  connection = mongoose.connect(`mongodb://${db.host}/${db.name}`);

mongoose.Promise = global.Promise;

autoIncrement.initialize(connection);
groupSchema.plugin(autoIncrement.plugin, 'group');

let groupModel = mongoose.model('group', groupSchema);

module.exports = groupModel;
