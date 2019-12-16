const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const connectSessionKnex = require("connect-session-knex");

const db = require("./data/db-config");

const server = express();

const KnexSessionStore = connectSessionKnex(session);

const sessionConfig = {
  name: "trackpad life",
  secret: "thug life",
  cookie: {
    maxAge: 1000 * 60 * 5,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUnititialzed: false,
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

module.exports = server;
