const express = require('express')
const routes = express.Router() //express utiliza o método Router() que faz com que a variável seja responsável pelas rotas
const instructors = require('./instructors')


routes.get('/', function(req, res) { //Página inicial
    return res.redirect("instructors") //Redirecionando para inicial
})

routes.get('/instructors', function(req, res) {
    return res.render("instructors/index") // renderizando a página inicial
})

routes.get('/instructors/create', function(rec, res) {
    return res.render("instructors/create")
})

routes.post("/instructors", function(req, res) {

    /* ------------------------------ ESTRUTURA DE VALIDAÇÃO ------------------------------*/
    const keys = Object.keys(req.body)

    for(key of keys) { //Verificando se algum campo(key) está vazio
        if(req.body[key] == "") { // Se algum campo estiver vazio... 
            return res.send('Por favor, preencha todos os campos.') // envie essa mensagem
        }
    }
    // corpo da requisição POST por isso req.body
    return res.send(req.body)
})

routes.get('/members', function(req, res) {
    return res.send("members")
})

module.exports = routes //exportando as rotas