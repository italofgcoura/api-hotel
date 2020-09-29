const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bodyParser = require("body-parser");
var caminhoURL = "localhost";
const app = express();
const port = 3000; //porta padrão
const regras = require('./regras')

//inicia o servidor
app.listen(port);
console.log("API funcionando!");

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
router.get("/", (req, res) => res.json({ message: "Funcionando!" }));
app.use("/", router);

//dados do banco de dados
function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: caminhoURL,
        port: 3306,
        user: "root",
        password: "",
        database: "hoteldatabase",
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            res.json(error);
        } else {

            //getAdmin transforma de 0 e 1 para admin e usuário
            res.json(regras.getAdmin(results));
}
    });
}


//lista todos clientes
router.get("/users", (req, res) => {
    execSQLQuery("SELECT * FROM users", res);
});






//lista um cliente
router.get("/users/:id?", (req, res) => {
    let filter = "";
    if (req.params.id) filter = " WHERE ID=" + parseInt(req.params.id);
    execSQLQuery("SELECT * FROM users " + filter, res);
});

//lista um cliente pelo nome
// router.get("/clientes/nome/:nome?", (req, res) => {
//   let filter = "";
//   if (req.params.nome) filter = " WHERE Nome=" + '"' + req.params.nome + '"';
//   execSQLQuery("SELECT * FROM clientes" + filter, res);
// });

//delete de um cliente
router.delete("/users/:id", (req, res) => {
    execSQLQuery("DELETE FROM users WHERE ID=" + parseInt(req.params.id), res);
});

//adcionando um cliente
router.post("/users", (req, res) => {
    const Nome = req.body.Nome.substring(0, 150);
    const CPF = req.body.CPF;
    // parseInt(quartoNumero);

    // const val1 = validations.userSchema.validate({
    //   nome: nome,
    //   cpf: cpf,
    // });

    // if (!val1.err) {
    execSQLQuery(
        `INSERT INTO users(Nome, CPF) VALUES('${Nome}','${CPF}')`,
        res
    );
    // } else {
    //   res.status(400).json({ msgErro: "Erro: Valores incorretos", nome, cpf });
    // }
});

//update
router.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const Nome = req.body.Nome.substring(0, 150);
    const CPF = req.body.CPF.substring(0, 11);
    execSQLQuery(
        `UPDATE users SET Nome='${Nome}', CPF='${CPF}' WHERE ID=${id}`,
        res
    );
});

module.exports = router;