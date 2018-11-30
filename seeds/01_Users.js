
exports.seed = function(knex, Promise) {
  var tableName = 'users';
  var rows = [
        {
            username: 'ana123',
            password: 'ana123',
            email: 'ana@sma.com',
        },

    ];

    return knex( tableName )
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
})
}