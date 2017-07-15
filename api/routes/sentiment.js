var express = require('express');
var router = express.Router();
const queries = require('../db/queries');

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '601414e2-8dbd-4c39-a53b-a3ea1c7573f8',
  'password': 'l5SVZItbU6ld',
  'version_date': '2017-02-27'
});

let urls

/* GET home page. */
router.post('/', (req, res, next) => {
  // let result = [];
  urls = req.body.urlArray;
  console.log('URLS: ', urls);
  let promises = [];
  urls.forEach(url => {
    promises.push(asynch(url))
  });
  console.log('PROMISES: ', promises);
  Promise.all(promises)
    .then((data) => res.send(data))
    .catch(err => console.log(err));
});

module.exports = router;

function asynch (url) {
  return new Promise ((resolve, reject) => {
    let parameters = getParams(url);
    natural_language_understanding.analyze(parameters, (err, response) => {
      err ? resolve('error') : resolve(response)});
  })
}

function getParams (url) {
  let params = {
    'url': url,
    'features': {
      'sentiment': {
        'targets': [
          'ethereum',
          'ether',
          'bitcoin',
          'cryptocurrency',
          'blockchain'
        ]
      }
    }
  }
  return params;
}

// 'emotion': {
//   'targets': [
//     'ethereum',
//     'ether',
//     'bitcoin',
//     'cryptocurrency',
//     'blockchain'
//   ]
// },
// 'keywords': {
//   'sentiment': true,
//   'emotion': true,
//   'limit': 4
// }
