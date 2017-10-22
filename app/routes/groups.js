let express = require('express'),
  router = express.Router(),
  HttpStatus = require('http-status-codes'),
  groupSerializer = require('../serializers/group-serializer'),
  groupModel = require('../models/group'),
  taskModel = require('../models/task');

router.get('/', function (req, res) {
  groupModel.find({})
    .then(groups => groupSerializer.serialize(groups))
    .then(serializedGroups => res.json(serializedGroups))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.get('/:group_id', function (req, res) {
  const id = req.params.group_id;

  groupModel.findById(id)
    .populate('tasks')
    .then(group => groupSerializer.serialize(group))
    .then(serializedGroup => res.json(serializedGroup))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.post('/', function (req, res) {
  const { body } = req,
    newGroup = Object.assign(new groupModel(), body.group);

  newGroup.save()
    .then(savedGroup => groupSerializer.serialize(savedGroup))
    .then(serializedGroup => res.json(serializedGroup))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.put('/:group_id', function (req, res) {
  const { body, params } = req,
    groupToUpdate = body.group,
    id = params.group_id;

  groupModel.findByIdAndUpdate(id, groupToUpdate, { new: true })
    .then(updatedGroup => groupSerializer.serialize(updatedGroup))
    .then(serializedGroup => res.json(serializedGroup))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.delete('/:group_id', function (req, res) {
  const { params } = req,
    id = params.group_id;

  Promise.all([
    groupModel.findByIdAndRemove(id),

    taskModel.update({ group: id }, { $set: { groupId: null } }, { multi: true })
  ])
    .then(([ removedGroup ]) => groupSerializer.serialize(removedGroup))
    .then(serializedGroup => res.json(serializedGroup))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

module.exports = router;
