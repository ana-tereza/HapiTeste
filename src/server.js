import Hapi from "hapi";

import { root, tasks, users } from "./routes";

const server = new Hapi.Server({
  port: process.env.PORT || 8000
});


const init = async () => {
  server.route([].concat(root).concat(tasks).concat(users));

  await server.start();
  console.log("Server is running at http://localhost:8000 (probably)");
};

init();