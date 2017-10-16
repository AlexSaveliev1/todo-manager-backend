let express = require('express'),
  router = express.Router(),
  taskSerializer = require('../serializers/task-serializer'),
  tasksQpParser = require('../services/tasks-qp-parser'),
  statisticsManager = require('../services/statistics-manager'),
  taskModel = require('../models/task'),
  groupModel = require('../models/group'),
  _ = require('lodash');

router.get('/', function(req, res, next) {
  const { query } = req,
    filter = tasksQpParser.parse(query);
    
  statisticsManager.tasksInfoByFilter(filter)
    .then(statistics => res.json(statistics))

});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;

});

module.exports = router;
