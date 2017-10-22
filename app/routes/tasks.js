let express = require('express'),
  router = express.Router(),
  HttpStatus = require('http-status-codes'),
  taskSerializer = require('../serializers/task-serializer'),
  tasksQpParser = require('../services/tasks-qp-parser'),
  taskModel = require('../models/task');

router.get('/', function (req, res) {
  const { query } = req,
    filter = tasksQpParser.parse(query);

  return taskModel.find(filter)
    .then(tasks => taskSerializer.serialize(tasks))
    .then(serializedTasks => res.json(serializedTasks))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.get('/:task_id', function (req, res) {
  const id = req.params.task_id;

  taskModel.findById(id)
    .then(task => taskSerializer.serialize(task))
    .then(serializedTask => res.json(serializedTask))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.post('/', function (req, res) {
  const { body } = req,
    newTask = Object.assign(new taskModel(), body.task);

  newTask.save()
    .then(savedTask => taskSerializer.serialize(savedTask))
    .then(serializedTask => res.json(serializedTask))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.put('/:task_id', function (req, res) {
  const { body, params } = req,
    taskToUpdate = body.task,
    id = params.task_id;

  taskModel.findByIdAndUpdate(id, taskToUpdate, { new: true })
    .then(updatedTask => taskSerializer.serialize(updatedTask))
    .then(serializedTask => res.json(serializedTask))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.delete('/:task_id', function (req, res) {
  const { params } = req,
    id = params.task_id;

  taskModel.findByIdAndRemove(id)
    .then(removedTask => taskSerializer.serialize(removedTask))
    .then(serializedTask => res.json(serializedTask))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

module.exports = router;
