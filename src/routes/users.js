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
    path: "/users/{user_info}",
    handler: (request, reply) => {
const info = request.params.user_info;
      return knex("users")
              .where("oid", info)
.orWhere("email", info)
.orWhere("username", info)
              .select("oid", "username", "password", "email")
              .then(result =>
                reply.response({ data: result[0] })
              );
    }
  }
];








export default users;
