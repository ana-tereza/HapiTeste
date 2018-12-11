exports.up = function(knex, Promise) {
  return knex.schema.createTable("tasks", function(table) {
    // chave primária
    table.increments("oid");

    // estrutura
    table.string("title", 50).notNullable();
    table.string("description", 250).notNullable();
    table.boolean("deleted");
    table.boolean("done");

    // timestamp
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks");
};