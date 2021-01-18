const express = require('express')
const routes = express.Router() // Express utiliza o método Router() que faz com que a variável seja responsável pelas rotas
const instructors = require('./instructors')


routes.get('/', function(req, res) { //Página inicial
    return res.redirect("instructors") //Redirecionando para inicial
})

routes.get('/instructors', function(req, res) {
    return res.render("instructors/index") // renderizando a página inicial
})

routes.get('/instructors/create', function(rec, res) { // Rota de criação
    return res.render("instructors/create")
})

routes.get("/instructors/:id", instructors.show) // Recebendo o id dentro do express

routes.get("/instructors/:id/edit", instructors.edit)

routes.put("/instructors", instructors.put)

routes.post("/instructors", instructors.post) // Passando a function de outro arquivo e trazendo para o routes

module.exports = routes // Exportando as rotas

/* 
    HTTP Verbs
    GET = RECEBER RESOURCE(entidade, autenticação)
    POST = CRIAR/SALVAR UM NOVO RESOURCE (com dados enviados)
    PUT = ATUALIZAR UM RESOURCE (a partir dos dados salvos)
    DELETE = DELETAR UM RESOURCE

*/