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

module.exports = {
  addBtcUsdData,
  getBtcUsdData
};
