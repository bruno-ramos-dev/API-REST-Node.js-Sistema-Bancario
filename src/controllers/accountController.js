const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const { readFileAndConvertJsonToArray, writeFile } = require('../utils/handleFile')

let arrayDatabase = readFileAndConvertJsonToArray('src/data/database.json')

const listBankAccounts = (req, res) => {
    return res.json(arrayDatabase[0].contas)
}

const createBankAccount = async (req, res) => {

    const { senha } = req.body

    try {

        let number = uuidv4()
        let balance = 0
        let encryptedPassword = await bcrypt.hash(senha, 10)
        let account = { numero: number, saldo: balance, usuario: { ...req.body, senha: encryptedPassword } }

        arrayDatabase[0].contas.push(account)
        let stringDatabase = JSON.stringify(arrayDatabase)
        writeFile('src/data/database.json', stringDatabase)

        return res.status(201).json()
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro no servidor ${error.message}` })
    }
}

const updateUserBankAccount = async (req, res) => {

    const { numeroConta } = req.params
    const { body } = req
    const { senha } = req.body

    try {

        const account = arrayDatabase[0].contas.find(account => account.numero === numeroConta)

        let encryptedPassword = await bcrypt.hash(senha, 10)

        account.usuario = { ...body, senha: encryptedPassword }

        let stringDatabase = JSON.stringify(arrayDatabase)
        writeFile('src/data/database.json', stringDatabase)

        return res.status(204).json()
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro no servidor ${error.message}` })
    }
}

const deleteBankAccount = async (req, res) => {

    const { numeroConta } = req.params

    try {

        const account = arrayDatabase[0].contas.find(account => account.numero === numeroConta)
        if (account.saldo != 0) return res.status(403).json({ mensagem: 'A sua conta possui saldo. Saque todo o valor antes de excluir a conta!' })

        const filteredDatabase = arrayDatabase[0].contas.filter(account => account.numero !== numeroConta)
        arrayDatabase[0].contas = filteredDatabase

        let stringDatabase = JSON.stringify(arrayDatabase)
        writeFile('src/data/database.json', stringDatabase)

        return res.status(204).json()
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro no servidor ${error.message}` })
    }
}

const balance = async (req, res) => {

    try {

        const { account } = req
        const balance = { saldo: account.saldo}
        return res.json(balance)
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro no servidor ${error.message}` })
    }
}

module.exports = {
    listBankAccounts, 
    createBankAccount, 
    updateUserBankAccount, 
    deleteBankAccount, 
    balance
}