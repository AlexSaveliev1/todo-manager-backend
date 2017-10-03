let express = require('express'),
  router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req, 'request')
});

module.exports = router;
