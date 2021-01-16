//TIMESTAMP: 
/*  é um número que determina um momento específico.
Tipicamente é expresso como o "número de segundos desde 1/1/1970 00:00 em Londres",
mas poderia ser qualquer outra base.
A ideia do timestamp é que ele vale no mundo todo,
ou seja, ele identifica o momento exato em que algo aconteceu. 
*/

module.exports = {
    age: function age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear() //Pegando o ano Atual e subtraindo o ano de nascimento
        const month = today.getMonth() - birthDate.getMonth() // Mesma lógica acima só que para mês

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) { // Se o mês atual não seja o mes de aniversáio OU(||) seja o mês de aniversário E(&&) o dia(atual) seja menor que a data de nasc.  
            age = age - 1 //Retirando um ano 
        }
        return age
    }
}