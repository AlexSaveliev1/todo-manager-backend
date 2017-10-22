let express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  app = express(),
  port = 3000;

// Routes
const tasks = require('./routes/tasks'),
  groups = require('./routes/groups'),
  subtasks = require('./routes/subtasks');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/tasks', tasks);
app.use('/groups', groups);
app.use('/subtasks', subtasks);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

app.listen(port, function () {
  console.log('app listen on port 3000');
});

module.exports = app;
