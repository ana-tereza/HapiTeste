exports.seed = function(knex, Promise) {
  const tableName = "tasks";
  const data = [
    {
dono: "ana123",
      title: "Planning class",
      description: "",
      deleted: true,
      done: false
    },
    {
dono: "ana123",
      title: "Build React UI",
      description: "",
      deleted: false,
      done: true
    },
    {
dono: "ana123",
      title: "Build React Native UI",
      description: "",
      deleted: false,
      done: false
    },
    {
dono: "ana123",
      title: "Build API",
      description: "",
      deleted: false,
      done: false
    },
    {
dono: "ana123",
      title: "Integrate React UI and API",
      description: "",
      deleted: false,
      done: false
    },
    {
dono: "ana123",
      title: "Integrate React Native UI and API",
      description: "",
      deleted: false,
      done: false
    }
  ];

  // Deletes ALL existing entries
  return knex(tableName)
    .del()
    .then(function() {
      return knex(tableName).insert(data);
    });
};