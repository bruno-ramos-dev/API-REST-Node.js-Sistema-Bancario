const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
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
        let account = { numero: number, saldo: balance, senha: encryptedPassword, usuario: { ...req.body } }

        arrayDatabase[0].contas.push(account)
        let stringDatabase = JSON.stringify(arrayDatabase)
        writeFile('src/data/database.json', stringDatabase)

        return res.status(201).json()
        
    } catch (error) {
        return res.status(400).json({ mensagem: `Erro no servidor ${error.message}` })
    }
}

module.exports = {
    listBankAccounts, 
    createBankAccount
}