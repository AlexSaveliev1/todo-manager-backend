let express = require('express'),
  router = express.Router(),
  taskSerializer = require('../serializers/task-serializer'),
  tasksQpParser = require('../services/tasks-qp-parser'),
  taskModel = require('../models/task'),
  _ = require('lodash');

router.get('/', function(req, res, next) {
  const { query } = req,
    { dueDate, from, to, priority, groupId } = query,
    isEmptyQuery = _.isEmpty(query),
    filter = tasksQpParser.parse(query),
    isFilterEmpty = _.isEmpty(filter);

    isFilterEmpty ? filter.groupId = { $eq: null } : ''

    return taskModel.find(filter)
      .then(tasks => taskSerializer.serialize(tasks))
      .then(serializedTasks => res.json(serializedTasks))
      .catch(error => res.status(404).json(error));
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  taskModel.findById(id)
    .then(task => taskSerializer.serialize(task))
    .then(serializedTask => res.json(serializedTask))
    .catch(error => res.status(404).json(error));
});

router.post('/', function(req, res, next) {
  const { body } = req,
    newTask = Object.assign(new taskModel(), body.task);

    newTask.save()
      .then(savedTask => taskSerializer.serialize(savedTask))
      .then(serializedTask => res.json(serializedTask))
      .catch(error => res.status(404).json(error));
});

router.put('/:id', function(req, res, next) {
  const { body, params } = req,
    taskToUpdate = body.task,
    { id } = params;

  taskModel.findByIdAndUpdate(id, taskToUpdate, { new: true })
    .then(updatedTask => taskSerializer.serialize(updatedTask))
    .then(serializedTask => res.json(serializedTask))
    .catch(error => res.status(404).json(error));
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
