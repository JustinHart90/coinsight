var express = require('express');
var router = express.Router();
const queries = require('../db/queries');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json('respond with a resource');
});

module.exports = router;
