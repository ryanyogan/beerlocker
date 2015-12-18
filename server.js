var express = require('express');

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(req, res) {
  debugger;
  res.json({ message: 'You are running dangerously low on beer!' });
});

app.use('/api', router);

app.listen(port);
console.log('Insert beer on port ' + port);
