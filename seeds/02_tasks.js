exports.seed = function(knex, Promise) {
  const tableName = "tasks";
  const data = [
    {
dono: "ana123",
      title: "Planning class",
      description: "",
categoria: '2',
      done: false,
late: false
    }
  ];

  // Deletes ALL existing entries
  return knex(tableName)
    .del()
    .then(function() {
      return knex(tableName).insert(data);
    });
};