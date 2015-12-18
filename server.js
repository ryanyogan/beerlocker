var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var router = express.Router();
var beerRoutes = require('./routes/beer');

mongoose.connect('mongodb://localhost:27017/beerlocker');

app.use(bodyParser.urlencoded({
  extended: true
}));

router.route('/beers')
  .post(beerRoutes.postBeers)
  .get(beerRoutes.getBeers);

router.route('/beers/:beer_id')
  .get(beerRoutes.getBeer)
  .put(beerRoutes.putBeer)
  .delete(beerRoutes.deleteBeer);

app.use('/api', router);

app.listen(port);
console.log('Insert beer on port ' + port);
