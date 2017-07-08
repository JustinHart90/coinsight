var express = require('express');
var router = express.Router();
const queries = require('../db/queries');

/* GET home page. */
router.get('/', (req, res, next) => {
  queries.getBtcUsdData()
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  res.json(req.body);
  // queries.addBtcUsdData(req.body)
  //   .then(id => console.log(id))
  //   .catch(err => next(err));
});

module.exports = router;
