
exports.up = function(knex, Promise) {
  return knex.schema.createTable('btc_usd', (table) => {
    table.increments();
    table.integer('time').notNullable();
    table.string('open')
    table.string('high');
    table.string('low');
    table.string('close');
    table.string('vwap');
    table.string('volume');
    table.integer('count');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('btc_usd');
};
