const express = require("express");
const app = express();
const appRouter = express.Router();
const create = require("./create-table");
const rotas = require('./routes')

appRouter.use('./routes', rotas);


create.conectar();

//função abaixo serve apara permitir requisisões
//resolve erro de cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, application/json, X-Requested-With, Content-Type, Accept"
  );
  next();
});




