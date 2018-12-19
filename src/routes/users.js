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
  },
{
    method: "PUT",
    path: "/users/{user_id}",
    handler: (request, reply) => {
      try {
        const { username, password, email } = JSON.parse(request.payload);
        const id = request.params.user_id;
        let user = {};
        if (username != undefined) {
          user.username = username;
        }
        if (password != undefined) {
          user.password = password;
        }
 if (email != undefined) {
          user.email = email;
        }
        return knex("users")
          .where("oid", id)
          .update(user)
          .then(result =>
            knex("users")
              .where("oid", id)
              .select("oid", "username", "password", "email")
              .then(result =>
                reply.response({ status: "updated", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response(err).code(401);
      }
    }
  },
{
    method: "DELETE",
    path: "/users/{user_id}",
    handler: (request, reply) => {
      const id = request.params.user_id;
      return knex("users")
        .where("oid", id)
        .del()
        .then(result => {
          console.log(result);
          if (result === 0) {
            return reply
              .response({
                status: "not deleted",
                message: "user not found!"
              })
              .code(409);
          } else {
            return knex("users")
              .where("oid", id)
              .select("oid", "username", "email", "password")
              .then(result =>
                reply.response({ status: "user deleted", data: result[0] }).code(200)
              );
          }
        })
        .catch(err => reply.response(err).code(401));
    }
  }
];
export default users;
