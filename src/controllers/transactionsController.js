const bcrypt = require('bcrypt')
const { format } = require('date-fns')
const { readFileAndConvertJsonToArray, writeFile } = require('../utils/handleFile')

let arrayDatabase = readFileAndConvertJsonToArray('src/data/database.json')

const deposit = (req, res) => {

    try {

        let { numero_conta, valor } = req.body

        valor = parseInt(valor)

        const account = arrayDatabase[0].contas.find(account => account.numero === numero_conta)

        account.saldo += valor

        const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        const deposit = { date, numero_conta, valor }

        arrayDatabase[0].depositos.push(deposit)

        let stringDatabase = JSON.stringify(arrayDatabase)
        writeFile('src/data/database.json', stringDatabase)

        return res.status(204).json()
        
    } catch (error) {
        return res.status(400).json({ mensagem: `Erro no servidor ${error.message}` })
    }
}

const withdraw = async (req, res) => {

    try {

        let { numero_conta, valor, senha } = req.body

        valor = parseInt(valor)

        const account = arrayDatabase[0].contas.find(account => account.numero === numero_conta)

        const validPassword = await bcrypt.compare(senha, account.usuario.senha)

        if (!validPassword) return res.status(403).json({ mensagem: 'Senha incorreta! Tente novamente.' })
        if (account.saldo <= 0 || account.saldo < valor) return res.status(403).json({ mensagem: 'Você não posssui saldo suficiente para realizar esta operação' })

        account.saldo -= valor

        const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        const withdraw = { date, numero_conta, valor }

        arrayDatabase[0].saques.push(withdraw)

        let stringDatabase = JSON.stringify(arrayDatabase)
        writeFile('src/data/database.json', stringDatabase)

        return res.status(204).json()
        
    } catch (error) {
        return res.status(400).json({ mensagem: `Erro no servidor ${error.message}` })
    }
}

module.exports = {
    deposit, 
    withdraw
}