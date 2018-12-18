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
  },
{
    method: "POST",
    path: "/users",
    handler: (request, reply) => {
      try {
        let { username, email, password } = JSON.parse(request.payload);
        if (username === undefined) {
          username = "";
          return reply.response({ error: "undefined username" }).code(400);
        }
if (email === undefined) {
          email = "";
          return reply.response({ error: "undefined email" }).code(400);
        }
if (password === undefined) {
          password = "";
          return reply.response({ error: "undefined password" }).code(400);
        }

        const user = {
          username: username,
          email: email,
          password: password
        };
        return knex
          .into("users")
          .insert(user)
          .returning("username")
          .then(result => {
            user.oid = result[0];
            return reply.response({ status: "cadastrado", data: user }).code(201);
          })
          .catch(err => {
            return reply.response(err).code(400);
          });
      } catch (err) {
        return reply
          .response({ error: "undefined user in json object"})
          .code(400);
      }
    }
  }
];








export default users;
