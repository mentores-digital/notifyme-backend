const express = require("express");
const UserController = require("./controllers/UserController");
const LoginController = require("./controllers/LoginController");
const NotifyController = require("./controllers/NotifyController");
const routes = express.Router();

routes.get("/", (req, res) => res.json({ api: true }));

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.post("/login", LoginController.store);

routes.post("/notify", NotifyController.store);
routes.get("/notify", NotifyController.index);
routes.get("/notify/:user", NotifyController.show);

module.exports = routes;
