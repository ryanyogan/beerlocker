var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

var Beer = require('./models/beer');

mongoose.connect('mongodb://localhost:27017/beerlocker');

app.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function(req, res) {
  debugger;
  res.json({ message: 'You are running dangerously low on beer!' });
});

app.use('/api', router);

// -- /api/beers -- //
var beersRoute = router.route('/beers');

beersRoute.post(function(req, res) {
  var beer = new Beer();

  Object.assign(beer, {
    name: req.body.name,
    type: req.body.type,
    quantity: req.body.quantity
  }).
  save(function(err) {
    if (err) { res.send(err); }

    res.json({ message: 'Beer added to the locker!' });
  });
});

beersRoute.get(function(req, res) {
  Beer.find(function(err, beers) {
    if (err) { res.send(err); }

    res.json(beers);
  });
});

// -- /api/beers/:beer_id -- //
var beerRoute = router.route('/beers/:beer_id');

beerRoute.get(function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err) { res.send(err); }

    res.json(beer);
  });
});

beerRoute.put(function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err) { res.send(err); }

    Object.assign(beer, {
      quantity: req.body.quantity
    }).
    save(function(err) {
      if (err) { res.send(err); }

      res.json(beer);
    });
  });
});

beerRoute.delete(function(req, res) {
  Beer.findByIdAndRemove(req.params.beer_id, function(err) {
    if (err) { res.send(err); }

    res.json({ message: 'Beer removed from the locker!' });
  });
});

app.listen(port);
console.log('Insert beer on port ' + port);
