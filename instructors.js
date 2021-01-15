const fs = require('fs') // módulo do Node.js **FILE SYSTEM trabalha com arquivos do sistema
const data = require('./data.json')

// req.query -> recebendo pela instrução da rota -> ?id=1
// req.body -> recebendo a partir do corpo da requisição(form)
// req.params-> recebendo pela instrução da rota -> /:id/:

//show
exports.show = function(req,res) {
    const { id } = req.params

    const foudInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foudInstructor) return res.send("Instructor not found!")

    return res.send(foudInstructor)
}
//create
exports.post = function(req, res) { //exportando apenas as functions

    /* ------------------------------ ESTRUTURA DE VALIDAÇÃO ------------------------------*/
    const keys = Object.keys(req.body)

    for(key of keys) { //Verificando se algum campo(key) está vazio
        if(req.body[key] == "") { // Se algum campo estiver vazio... 
            return res.send('Por favor, preencha todos os campos.') // envie essa mensagem
        }
    }

    /* --------------------- Escrevendo no data.json --------------------- */
    let {avatar_url, name, birth, gender, services} = req.body //usando o LET pois poderão ser alteradas
    
    birth = Date.parse(birth) //Transformando e escrevendo as datas de nasc. em milissegundos 
    const created_at = Date.now() // Adicionando e escrevendo a data de criação em milissegundos  
    const id = Number(data.instructors.length + 1) // Adicionando um ID numeral crescente ao instrutor

    /* ---------------------  Desestruturando o req.body  ---------------------*/


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

//Módulo.função(CAMINHO(path), CONSTRUCTOR JSON.método conversor(onde passará os valores, null, 2 espaços).MÉTODO(VALOR), FUNCTION(CALLBACK))

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) return res.send("Write file error.") 

        return res.redirect("/instructors")
    })

    // corpo da requisição POST por isso req.body
    // return res.send(req.body)
}


//update

//delete
