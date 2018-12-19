exports.up = function(knex, Promise) {
return knex.schema
.createTable("users", function(table) { 
// chave primária
    table.increments("oid");
    // estrutura
    table.string("username", 50).notNullable();
table.string("password", 15).notNullable();
    table.string("email", 250).notNullable();
    // timestamp
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
 })
 
.createTable("tasks", function(table) {
    // chave primária
    table.increments("oid");
//foreign key dono
table.string( 'dono', 50 ).references( 'username' ).inTable( 'users' ).notNullable();
    // estrutura
 
    table.string("title", 50).notNullable();
    table.string("description", 250).notNullable();

//categoria 0 = Tarefa, 1 = Nota, 2=  Evento
    table.integer("categoria",1).notNullable;
    table.boolean("done");
table.boolean("late");

    // timestamp
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });


};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks")
.dropTableIfExists("users");
};