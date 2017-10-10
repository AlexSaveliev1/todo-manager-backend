let express = require('express'),
  router = express.Router(),
  groupSerializer = require('../serializers/group-serializer'),
  taskSerializer = require('../serializers/task-serializer'),
  groupModel = require('../models/group'),
  _ = require('lodash');

router.get('/', function(req, res, next) {
  groupModel.find({})
    .then(savedGroup => groupSerializer.serialize(savedGroup))
    .then(serializedGroup => res.json(serializedGroup))
    .catch(error => res.status(404).json(error));
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  groupModel.findById(id)
    .populate('tasks')
    .then(group => groupSerializer.serialize(group, { populated: true }))
    .then(serializedGroup => res.json(serializedGroup))
    .catch(error => res.status(404).json(error));
});

router.post('/', function(req, res, next) {
const { body } = req,
  newGroup = Object.assign(new groupModel(), body.group);

  newGroup.save()
    .then(savedGroup => groupSerializer.serialize(savedGroup))
    .then(serializedGroup => res.json(serializedGroup))
    .catch(error => res.status(404).json(error));
});

router.put('/:id', function(req, res, next) {
const { body, params } = req,
  taskToUpdate = body.task,
  { id } = params;

taskModel.findByIdAndUpdate(id, taskToUpdate, { new: true })
});

router.delete('/:id', function(req, res, next) {
const { body, params } = req,
{ id } = params;

taskModel.findByIdAndRemove(id)
  .then(removedTask => taskSerializer.serialize(removedTask))
  .then(serializedTask => res.json(serializedTask))
  .catch(error => res.status(404).json(error));
});


module.exports = router;
