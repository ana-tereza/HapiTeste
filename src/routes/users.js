import knex from "../config/knex";

const requestHandler = (request, reply) => {
  return knex
    .from("users")
    .select("oid", "username", "password", "email")
    .then(results => reply.response(results))
    .catch(err => console.log(err));
};

const users = [
  {
    method: "GET",
    path: "/users",
    handler: (request, reply) => {
      return requestHandler(request, reply);
    }
  },
  {
    method: "GET",
    path: "/users/",
    handler: (request, reply) => {
      return requestHandler(request, reply);
    }
  }
];

export default users;