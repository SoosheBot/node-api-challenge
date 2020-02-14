const express = require("express");
const server = express();

const helmet = require("helmet");
const cors = require("cors");

const projectRouter = require("./data/routers/projectRouter");
const actionRouter = require("./data/routers/actionRouter");

server.use(express.json());
server.use(helmet());
server.use(cors());

// server.use("/api/projects", logger, projectRouter);
// server.use("/api/projects", logger, actionRouter);

//init test of server on insomnia
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running." });
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

module.exports = server;
