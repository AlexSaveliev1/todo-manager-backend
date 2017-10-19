let express = require('express'),
  router = express.Router(),
  subtaskSerializer = require('../serializers/subtask-serializer'),
  tasksQpParser = require('../services/tasks-qp-parser'),
  subtaskModel = require('../models/subtask');

router.get('/', function (req, res, next) {
  const { query } = req,
    filter = tasksQpParser.parse(query);

  return subtaskModel.find(filter)
    .then(tasks => subtaskSerializer.serialize(tasks))
    .then(serializedTasks => res.json(serializedTasks))
    .catch(error => res.status(404).json(error));
});

router.get('/:subtask_id', function (req, res, next) {
  const id = req.params.subtask_id;

  subtaskModel.findById(id)
    .then(subtask => subtaskSerializer.serialize(subtask))
    .then(serializedSubtask => res.json(serializedSubtask))
    .catch(error => res.status(404).json(error));
});

router.post('/', function (req, res, next) {
  const { body } = req,
    newSubtask = Object.assign(new subtaskModel(), body.subtask);

  newSubtask.save()
    .then(savedSubtask => subtaskSerializer.serialize(savedSubtask))
    .then(serializedSubtask => res.json(serializedSubtask))
    .catch(error => res.status(404).json(error));
});

router.put('/:subtask_id', function (req, res, next) {
  const { body, params } = req,
    subtaskToUpdate = body.subtask,
    id = params.subtask_id;

  subtaskModel.findByIdAndUpdate(id, subtaskToUpdate, { new: true })
    .then(updatedSubtask => subtaskSerializer.serialize(updatedSubtask))
    .then(serializedSubtask => res.json(serializedSubtask))
    .catch(error => res.status(404).json(error));
});

router.delete('/:subtask_id', function (req, res, next) {
  const { body, params } = req,
    id = params.subtask_id;

  subtaskModel.findByIdAndRemove(id)
    .then(removedSubtask => subtaskSerializer.serialize(removedSubtask))
    .then(serializedSubtask => res.json(serializedSubtask))
    .catch(error => res.status(404).json(error));
});

module.exports = router;
