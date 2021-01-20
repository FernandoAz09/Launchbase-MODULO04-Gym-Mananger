const express = require('express')
const routes = express.Router() // Express utiliza o método Router() que faz com que a variável seja responsável pelas rotas
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')


routes.get('/', function(req, res) { //Página inicial
    return res.redirect("instructors") //Redirecionando para inicial
})
routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get("/instructors/:id", instructors.show) // Recebendo o id dentro do express
routes.get("/instructors/:id/edit", instructors.edit)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)
routes.post("/instructors", instructors.post) // Passando a function de outro arquivo e trazendo para o routes



routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get("/members/:id", members.show) 
routes.get("/members/:id/edit", members.edit)
routes.put("/members", members.put)
routes.delete("/members", members.delete)
routes.post("/members", members.post) 


module.exports = routes // Exportando as rotas

/* 
    HTTP Verbs
    GET = RECEBER RESOURCE(entidade, autenticação)
    POST = CRIAR/SALVAR UM NOVO RESOURCE (com dados enviados)
    PUT = ATUALIZAR UM RESOURCE (a partir dos dados salvos)
    DELETE = DELETAR UM RESOURCE

*/