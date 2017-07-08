
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bots', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.timestamp('created_on').defaultTo(knex.fn.now())
    table.string('num_transactions').notNullable();
    table.integer('profit');
    table.integer('balance');
    table.boolean('is_active').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bots');
};
