//create
exports.post = function(req, res) {

    /* ------------------------------ ESTRUTURA DE VALIDAÇÃO ------------------------------*/
    const keys = Object.keys(req.body)

    for(key of keys) { //Verificando se algum campo(key) está vazio
        if(req.body[key] == "") { // Se algum campo estiver vazio... 
            return res.send('Por favor, preencha todos os campos.') // envie essa mensagem
        }
    }
    // corpo da requisição POST por isso req.body
    return res.send(req.body)
}
//update

//delete
