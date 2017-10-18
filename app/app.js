let express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  app = express();

// Routes
const tasks = require('./routes/tasks'),
  groups = require('./routes/groups');

app.use(logger('dev'));

app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/tasks', tasks);
app.use('/groups', groups);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, function () {
  console.log('app listen on port 3000');
});

module.exports = app;
