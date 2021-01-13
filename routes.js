const express = require('express')
const routes = express.Router() //express utiliza o método Router() que faz com que a variável seja responsável pelas rotas

routes.get('/', function(req,res) { //Página inicial
    return res.redirect("instructors") //Redirecionando para inicial
})

routes.get('/instructors', function(req,res) {
    return res.render("instructors/index") // renderizando a página inicial
})

routes.get('/members', function(req,res) {
    return res.send("members")
})

module.exports = routes //exportando as rotas