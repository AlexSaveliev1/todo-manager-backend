let express = require('express'),
  router = express.Router(),
  HttpStatus = require('http-status-codes'),
  commentSerializer = require('../serializers/comment-serializer'),
  commentModel = require('../models/comment');

router.get('/', function (req, res) {
  return commentModel.find({})
    .then(comments => commentSerializer.serialize(comments))
    .then(serializedComments => res.json(serializedComments))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.post('/', function (req, res) {
  const { body } = req,
    newComment = Object.assign(new commentModel(), body.comment);

  newComment.save()
    .then(savedComment => commentSerializer.serialize(savedComment))
    .then(serializedComment => res.json(serializedComment))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

module.exports = router;
