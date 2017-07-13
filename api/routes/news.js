var express = require('express');
var router = express.Router();
const queries = require('../db/queries');
const request = require('request');

/* GET home page. */
router.get('/', (req, res, next) => {
  queries.getEvents()
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

// function getNewsData () {
//   getEvents()
//     .then(data => {
//       res.json(data)
//     })
//     .catch(err => res.send(err));
// }

// function getEvents () {
//   request.get({
//     url: 'http://eventregistry.org/json/event?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%7B%22%24and%22%3A%5B%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBitcoin%22%5D%7D%7D%2C%7B%22dateStart%22%3A%222013-04-29%22%2C%22dateEnd%22%3A%222017-07-20%22%7D%5D%7D%7D&action=getEvents&resultType=events&eventsSortBy=date&eventsCount=20&eventsIncludeEventSummary=true&eventsIncludeEventConcepts=false&eventsIncludeEventCategories=false&eventsIncludeEventLocation=false&eventsIncludeEventSocialScore=true&eventsEventImageCount=1&eventsIncludeConceptLabel=false&eventsIncludeSourceTitle=false&eventsIncludeSourceImportance=true&eventsIncludeStoryBasicStats=true&eventsIncludeStoryDate=true&eventsIncludeStorySocialScore=true'
//     }, (error, response, body) => {
//       console.log(error);
//       body = JSON.parse(body);
//       return body;
//     });
// }
