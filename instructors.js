const fs = require('fs') // Módulo do Node.js **FILE SYSTEM trabalha com arquivos do sistema
const data = require('./data.json')
const { age } = require('./utils') // Objeto desestruturado e exportado 
const Intl = require('intl') // Instalado para formatar a data conforme a região

// req.query -> recebendo pela instrução da rota -> ?id=1
// req.body -> recebendo a partir do corpo da requisição(form)
// req.params-> recebendo pela instrução da rota -> /:id/:

////////////////////////        SHOW
exports.show = function(req,res) { 
    const { id } = req.params // desestruturando, retirando o ID do req.params

    const foudInstructor = data.instructors.find(function(instructor){ // Encontrando(com o find) o ID dentro de instructor
        return instructor.id == id // FIND -> BOOLEAN
    })

    if (!foudInstructor) return res.send("Instructor not found!")

    const instructor = { // Configurando os dados apresentados
        ...foudInstructor, // Os ajustes abaixo serão feitos e o restante ficara espalhado dentro do foundInstructors
        age: age(foudInstructor.birth),
        services: foudInstructor.services.split(", "),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foudInstructor.created_at),
    }

    return res.render("instructors/show", { instructor }) // Renderizando os dados na página show.njk
}

////////////////////////        CREATE
exports.post = function(req, res) { //exportando apenas as functions

    /* ------------------------------ ESTRUTURA DE VALIDAÇÃO ------------------------------*/
    const keys = Object.keys(req.body)

    for(key of keys) { //Verificando se algum campo(key) está vazio
        if(req.body[key] == "") { // Se algum campo estiver vazio... 
            return res.send('Por favor, preencha todos os campos.') // Envie essa mensagem
        }
    }


    /* ---------------------  Desestruturando o req.body  ---------------------*/
    
    let {avatar_url, name, birth, gender, services} = req.body // Usando o LET pois poderão ser alteradas
    

    /* --------------------- TRATAMENTO DOS DADOS --------------------- */

    birth = Date.parse(birth) //Transformando e escrevendo as datas de nasc. em milissegundos <--TIMESTAMP
    const created_at = Date.now() // Adicionando e escrevendo a data de criação em milissegundos <--TIMESTAMP
    const id = Number(data.instructors.length + 1) // Adicionando um ID numeral crescente ao instrutor
    

    /* --------------------- Escrevendo no data.json --------------------- */

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    }) 
    

    /* --------------------- TRANSFORMANDO OS DADOS DIGITADOS EM JSON ---------------------*/

// Módulo.função(CAMINHO(path), CONSTRUCTOR JSON.método conversor(onde passará os valores, null, 2 espaços).MÉTODO(VALOR), FUNCTION(CALLBACK))

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) return res.send("Write file error.") 

        return res.redirect("/instructors")
    })

    // Corpo da requisição POST por isso req.body
    // return res.send(req.body)
}


////////////////////////        UPDATE

////////////////////////        DELETE
