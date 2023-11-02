const { format } = require('date-fns')
const { readFileAndConvertJsonToArray, writeFile } = require('../utils/handleFile')

let arrayDatabase = readFileAndConvertJsonToArray('src/data/database.json')

const deposit = (req, res) => {

    try {

        let { numero_conta, valor } = req.body

        const account = arrayDatabase[0].contas.find(account => account.numero === numero_conta)

        valor = parseInt(valor)

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

module.exports = {
    deposit
}