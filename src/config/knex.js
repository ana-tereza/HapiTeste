import knex from "knex";

export default knex({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3",
    charset: "utf8"
  }
});

