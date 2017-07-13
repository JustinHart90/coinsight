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

module.exports = {
  addBtcUsdData,
  getBtcUsdData,
  getEvents
};
