
exports.up = function(knex) {
  return knex.schema.createTable('baskets', table =>{
    table.increments();
    table.string('name')
    table.float('price', 2)
    table.float('weight')
    table.text('description')
    table.boolean('is_branded')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('baskets')
};
