const mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatshark"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Conectado!");
});


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();



app.get('/todos', (req, res) => {
    connection.query("SELECT * FROM cliente", function(err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
})

//Pegar por Id
app.get('/cliente/:id', (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM cliente where id = ${id}`, function(err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
})


app.post('/', jsonParser, function(req, res) {
    const body = req.body;
    var sql = `INSERT INTO cliente (nome, email, senha) VALUES ("${body.nome}", "${body.email}", "${body.senha}")`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})


app.post('/atualizar/:id', jsonParser, function(req, res) {
    const id = req.params.id;
    const body = req.body;
    var sql = `UPDATE cliente SET nome="${body.nome}",email="${body.email}",senha="${body.senha}" WHERE id = ${id}`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})

app.post('/deletar/:id', jsonParser, function(req, res) {
    const id = req.params.id;
    var sql = `DELETE FROM cliente WHERE Id = ${id}`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Deletado");
    });
})

//Porta do Servidor
app.listen('3000', () => {
    console.log('Funcionando')
})