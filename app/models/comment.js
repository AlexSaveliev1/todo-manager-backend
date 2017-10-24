const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  commentSchema = require('../schemas/comment'),
  config = require('../config'),
  { db } = config,
  connection = mongoose.connect(`mongodb://${db.host}/${db.name}`);

mongoose.Promise = global.Promise;

autoIncrement.initialize(connection);
commentSchema.plugin(autoIncrement.plugin, 'comment');

let commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;
