
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('username');
    table.string('email');
    table.string('password');
    table.boolean('is_admin').notNullable().defaultTo(false);
    table.timestamp('created_on').defaultTo(knex.fn.now())
    table.timestamp('updated_on').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
