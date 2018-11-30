
exports.seed = function(knex, Promise) {
 var tableName = 'bullets';
  var rows = [
        {
           dono:'ana123',
descricao:'primeiro bullet task',
categoria:'tarefa',
        },

    ];

    return knex( tableName )
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
})
};
