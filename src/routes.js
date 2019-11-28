const express = require("express");
const UserController = require("./controllers/UserController");
const LoginController = require("./controllers/LoginController");

const routes = express.Router();

routes.get("/", (req, res) => res.json({ api: true }));

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.post("/login", LoginController.store);

module.exports = routes;
