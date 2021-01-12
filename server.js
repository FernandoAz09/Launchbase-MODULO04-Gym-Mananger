const express = require("express") //importando a dependencia do express
const nunjucks = require("nunjucks") // Template engine // reuso de códigos // 
const routes = require('./routes')

const server = express() // criando um servidor, executando o express como função

server.use(express.static('public')) // express observando a pasta "public", para servir o arquivos estáticos
server.use(routes)

server.set("view engine", "njk") //Configurando a Template Engine //setando o motor de view para NJK (antes como HTML)

nunjucks.configure("views", { //Configurando o caminho "views" , opções em objeto, usando o express com a variável que ele está utilizando
    express: server,
    autoescape: false, //resolvendo padrão do NUNJUKS de segurar códigos e formatação HTML colocadas nas variáveis
    noCache: true //não guardar CACHE para que possa haver mudança nas classes e ID
})



/*server.use(function(req, res) { //Desafio 3  - colocar o 404 no backend de forma dinâmica
    const notFound = {
        linha1: "Erro 404",
        linha2: "Nem o Google consegue encontrar a página que você procura. KKKKKKK",
        linha3: "Que tal usar os botões de navegação acima? :)",
    }

    res.status(404).render("not-found", { notFound })
  })
*/


server.listen(5000, function() { //servidor fica ouvindo a porta 5000 // CALLBACK = função dentro de uma outra função
    console.log("server is running")
})