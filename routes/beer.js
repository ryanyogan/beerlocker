var Beer = require('../models/beer');

exports.postBeers = function(req, res) {
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
};

exports.getBeers = function(req, res) {
  Beer.find(function(err, beers) {
    if (err) { res.send(err); }

    res.json(beers);
  });
};

exports.getBeer = function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err) { res.send(err); }

    res.json(beer);
  });
};

exports.putBeer = function(req, res) {
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
};

exports.deleteBeer = function(req, res) {
  Beer.findByIdAndRemove(req.params.beer_id, function(err) {
    if (err) { res.send(err); }

    res.json({ message: 'Beer removed from the locker!' });
  });
};
