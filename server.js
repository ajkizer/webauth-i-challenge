const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const connectSessionKnex = require("connect-session-knex");

const db = require("./data/db-config");

const server = express();

const KnexSessionStore = connectSessionKnex(session);

const AuthRouter = require("./auth/auth-router");
const UserRouter = require("./users/users-router");

const sessionConfig = {
  name: "trackpad life",
  secret: "thug life",
  cookie: {
    maxAge: 1000 * 60 * 5,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use("/api/auth", AuthRouter);
server.use("/api/users", UserRouter);

module.exports = server;
