const knex = require('./connection');

function addBtcUsdData (data) {
  return knex('btc_usd')
    .returning('id')
    .insert(data)
    .first()
}

function getBtcUsdData () {
  return knex('btc_usd')
    .select()
}

function getEvents () {
  return knex('events')
    .select()
}

function postSentiment (score, label, url) {
  return knex('sentiment')
    .returning('id')
    .insert({
      score,
      label,
      url
    })
    .first()
}

function getSentiment () {
  return knex('sentiment')
    .select()
}

module.exports = {
  addBtcUsdData,
  getBtcUsdData,
  getEvents,
  postSentiment,
  getSentiment
};
