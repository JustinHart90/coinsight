
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sentiment', (table) => {
    table.increments();
    table.string('score');
    table.string('label');
    table.string('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sentiment');
};
