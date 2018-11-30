
exports.up = function(knex, Promise) {
  return knex
            .schema
            .createTable( 'users', function( usersTable ) {
                // Primary Key
                usersTable.increments();

                // Dados colunas
                usersTable.string( 'username', 50 ).notNullable().unique();
                usersTable.string( 'email', 250 ).notNullable().unique();
                usersTable.string( 'password', 128 ).notNullable();
            } )

            .createTable( 'bullets', function( bulletsTable ) {

                // Primary Key
                bulletsTable.increments();
                bulletsTable.string( 'dono', 50 ).references( 'username' ).inTable( 'users' );

                // Data
                bulletsTable.string( 'descricao', 250 ).notNullable();
                bulletsTable.string( 'categoria', 250 ).notNullable();
                bulletsTable.datetime( 'vencimento');

                bulletsTable.timestamp( 'criadoem' ).notNullable();

            } );

};

exports.down = function(knex, Promise) {
  return knex
        .schema
            .dropTableIfExists( 'bullets' )
            .dropTableIfExists( 'users' );
};
