var express = require('express');
var router = express.Router();
const queries = require('../db/queries');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json('index route!');
});

module.exports = router;
