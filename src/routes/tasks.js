import knex from "../config/knex";

const requestHandler = (request, reply) => {
  return knex
    .from("tasks")
    .where({ deleted: false })
    .select("oid", "dono", "title", "description", "done")
    .then(results => reply.response(results))
    .catch(err => console.log(err));
};

const tasks = [
  {
    method: "GET",
    path: "/tasks",
    handler: (request, reply) => {
      return requestHandler(request, reply);
    }
  },
  {
    method: "GET",
    path: "/tasks/",
    handler: (request, reply) => {
      return requestHandler(request, reply);
    }
  }
];

export default tasks;