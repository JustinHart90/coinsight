
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', (table) => {
    table.increments();
    table.integer('article_count');
    table.string('date');
    table.string('event_id');
    table.string('img');
    table.string('score');
    table.text('summary', ['longText']);
    table.string('title');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events');
};
