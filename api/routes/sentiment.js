var express = require('express');
var router = express.Router();
const queries = require('../db/queries');

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '601414e2-8dbd-4c39-a53b-a3ea1c7573f8',
  'password': 'l5SVZItbU6ld',
  'version_date': '2017-02-27'
});

/* GET home page. */
router.get('/', (req, res, next) => {
  let url = 'http://www.businessinsider.com/ethers-value-volatility-investors-staying-put-2017-7';
  let sentiment = getSentiment(url);
  return sentiment
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => res.json(err));
  res.send(data);
});

module.exports = router;

function getSentiment (articleUrl) {
  var parameters = {
    'url': articleUrl,
    'features': {
      'sentiment': {
        'targets': [
          'ether'
        ]
      }
    }

    // 'features': {
    //   'sentiment': {
    //     'targets': [
    //       'ethereum'
    //     ]
    //   },
    //   'emotion': {
    //     'targets': [
    //       'ethereum'
    //     ]
    //   },
    //   'keywords': {
    //     'sentiment': true,
    //     'emotion': true,
    //     'limit': 3
    //   }
    // }
  }

  natural_language_understanding.analyze(parameters, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
      return JSON.stringify(response, null, 2);
    }
  });
}
