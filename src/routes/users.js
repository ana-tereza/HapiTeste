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
    path: "/users/{user_id}",
    handler: (request, reply) => {
const id = request.params.user_id;
      return knex("users")
              .where("oid", id)
              .select("oid", "username", "password", "email")
              .then(result =>
                reply.response({ data: result[0] })
              );
    }
  }
];








export default users;