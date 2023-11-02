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
        const deposit = { data: date, numero_conta, valor }

        arrayDatabase[0].depositos.push(deposit)

        let stringDatabase = JSON.stringify(arrayDatabase)
        writeFile('src/data/database.json', stringDatabase)

        return res.status(204).json()
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro no servidor ${error.message}` })
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
        const withdraw = { data: date, numero_conta, valor }

        arrayDatabase[0].saques.push(withdraw)

        let stringDatabase = JSON.stringify(arrayDatabase)
        writeFile('src/data/database.json', stringDatabase)

        return res.status(204).json()
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro no servidor ${error.message}` })
    }
}

const transfer = async (req, res) => {

    try {

        let { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

        valor = parseInt(valor)

        const sourceAccount = arrayDatabase[0].contas.find(account => account.numero === numero_conta_origem)
        if (!sourceAccount) return res.status(404).json({ mensagem: 'Conta de origem não encontrada em nosso banco de dados' })
        
        const destinationAccount = arrayDatabase[0].contas.find(account => account.numero === numero_conta_destino)
        if (!destinationAccount) return res.status(404).json({ mensagem: 'Conta de destino não encontrada em nosso banco de dados' })

        if (sourceAccount === destinationAccount) return res.status(403).json({ mensagem: 'Operação proibida! As contas de destino e origem não podem ser iguais!' })

        const validPassword = await bcrypt.compare(senha, sourceAccount.usuario.senha)

        if (!validPassword) return res.status(403).json({ mensagem: 'Senha incorreta! Tente novamente.' })
        if (sourceAccount.saldo <= 0 || sourceAccount.saldo < valor) return res.status(403).json({ mensagem: 'Você não posssui saldo suficiente para realizar esta operação' })

        sourceAccount.saldo -= valor
        destinationAccount.saldo += valor

        const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        const transfer = { data: date, numero_conta_origem, numero_conta_destino, valor }

        arrayDatabase[0].transferencias.push(transfer)

        let stringDatabase = JSON.stringify(arrayDatabase)
        writeFile('src/data/database.json', stringDatabase)

        return res.status(204).json()
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro no servidor ${error.message}` })
    }
}


module.exports = {
    deposit, 
    withdraw, 
    transfer
}