import knex from "../config/knex";

const requestHandler = (request, reply) => {
  return knex
    .from("tasks")
    .select("oid", "dono", "title", "description", "categoria", "done", "late")
    .then(results => reply.response(results))
    .catch(err => console.log(err));
};

module.exports = [
 {
    method: "GET",
    path: "/tasks",
    handler: (request, reply) => {
      return requestHandler(request, reply);
    }
  },
  {
    method: "GET",
    path: "/tasks/{task_id}",
    handler: (request, reply) => {
const id = request.params.task_id;
      return knex("tasks")
              .where("oid", id)
              .select("oid", "dono", "title", "description", "categoria", "done", "late")
              .then(result =>
                reply.response({ data: result[0] })
              );
    }
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (request, reply) => {
    console.log(request.payload);
      try {
        let { dono, title, description, categoria } = JSON.parse(request.payload);
console.log(title);
        if (title === undefined) {
          title = "";
          return reply.response({ error: "undefined title" }).code(400);
        }
        if (description === undefined) {
          description = "";
        }
        const task = {
          title: title,
dono: dono,
          description: description,
categoria: categoria,
          done: false,
late: false
        };
        return knex
          .into("tasks")
          .insert(task)
          .returning("oid")
          .then(result => {
            task.oid = result[0];
            return reply.response({ status: "inserted", data: task }).code(201);
          })
          .catch(err => {
            return reply.response(err).code(400);
          });
      } catch (err) {
        return reply
          .response({ error: "undefined task in json object"})
          .code(400);
      }
    }
  },
  {
    method: "PUT",
    path: "/tasks/{task_id}",
    handler: (request, reply) => {
      try {
        const { title, description, categoria } = JSON.parse(request.payload);
        const id = request.params.task_id;
        let task = {};
        if (title != undefined) {
          task.title = title;
        }
        if (description != undefined) {
          task.description = description;
        }
if (categoria != undefined) {
          task.categoria = categoria;
        }
        return knex("tasks")
          .where("oid", id)
          .update(task)
          .then(result =>
            knex("tasks")
              .where("oid", id)
              .select("oid", "dono", "title", "description", "categoria", "done", "late")
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
    method: "PUT",
    path: "/tasks/{task_id}/done",
    handler: (request, reply) => {
      try {
        const id = request.params.task_id;
        let task = { done: true };
        return knex("tasks")
          .where("oid", id)
          .update(task)
          .then(result =>
            knex("tasks")
              .where("oid", id)
              .select("oid", "dono", "title", "description", "categoria", "done", "late")
              .then(result =>
                reply.response({ status: "done", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response(err).code(401);
      }
    }
  },
  {
    method: "PUT",
    path: "/tasks/{task_id}/undone",
    handler: (request, reply) => {
      try {
        const id = request.params.task_id;
        let task = { done: false };
        return knex("tasks")
          .where("oid", id)
          .update(task)
          .then(result =>
            knex("tasks")
              .where("oid", id)
              .select("oid", "dono", "title", "description", "categoria", "done", "late")
              .then(result =>
                reply.response({ status: "undone", data: result[0] }).code(200)
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
    path: "/tasks/{task_id}",
    handler: (request, reply) => {
      const id = request.params.task_id;
      return knex("tasks")
        .where("oid", id)
        .del()
        .then(result => {
          console.log(result);
          if (result === 0) {
            return reply
              .response({
                status: "not deleted",
                message: "task not found!"
              })
              .code(409);
          } else {
            return knex("tasks")
              .where("oid", id)
              .select("oid", "dono", "title", "description", "categoria", "done", "late")
              .then(result =>
                reply.response({ status: "deleted", data: result[0] }).code(200)
              );
          }
        })
        .catch(err => reply.response(err).code(401));
    }
  }
];