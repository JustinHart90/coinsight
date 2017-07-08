
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bot_transactions', (table) => {
    table.increments();
    table.string('bot_id').notNullable();
    table.string('date').notNullable();
    table.string('time').notNullable();
    table.integer('buy_price');
    table.integer('quantity');
    table.integer('sell_price');
    table.integer('profit');
    table.string('currency');
    table.string('ticker');
    table.string('status');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bot_transactions');
};
