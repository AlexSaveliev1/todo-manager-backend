let express = require('express'),
  router = express.Router(),
  HttpStatus = require('http-status-codes'),
  subtaskSerializer = require('../serializers/subtask-serializer'),
  tasksQpParser = require('../services/tasks-qp-parser'),
  subtaskModel = require('../models/subtask');

router.get('/', function (req, res) {
  const { query } = req,
    filter = tasksQpParser.parse(query);

  return subtaskModel.find(filter)
    .then(tasks => subtaskSerializer.serialize(tasks))
    .then(serializedTasks => res.json(serializedTasks))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.get('/:subtask_id', function (req, res) {
  const id = req.params.subtask_id;

  subtaskModel.findById(id)
    .then(subtask => subtaskSerializer.serialize(subtask))
    .then(serializedSubtask => res.json(serializedSubtask))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.post('/', function (req, res) {
  const { body } = req,
    newSubtask = Object.assign(new subtaskModel(), body.subtask);

  newSubtask.save()
    .then(savedSubtask => subtaskSerializer.serialize(savedSubtask))
    .then(serializedSubtask => res.json(serializedSubtask))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.put('/:subtask_id', function (req, res) {
  const { body, params } = req,
    subtaskToUpdate = body.subtask,
    id = params.subtask_id;

  subtaskModel.findByIdAndUpdate(id, subtaskToUpdate, { new: true })
    .then(updatedSubtask => subtaskSerializer.serialize(updatedSubtask))
    .then(serializedSubtask => res.json(serializedSubtask))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

router.delete('/:subtask_id', function (req, res) {
  const { params } = req,
    id = params.subtask_id;

  subtaskModel.findByIdAndRemove(id)
    .then(removedSubtask => subtaskSerializer.serialize(removedSubtask))
    .then(serializedSubtask => res.json(serializedSubtask))
    .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
});

module.exports = router;
