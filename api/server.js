const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const server = express();
const { errHandler } = require("./server-middleware.js");
const actions = require("./actions/actions-router.js");
const projects = require("./projects/projects-router.js");

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan("combined"));

server.all("/", (req, res) => res.status(200).json("/"));
server.use("/api/actions", actions);
server.use("/api/projects", projects);

server.use(errHandler);

module.exports = server;
