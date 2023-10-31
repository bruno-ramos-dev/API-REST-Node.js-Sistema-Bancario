const { readFileAndConvertJsonToArray } = require('../utils/handleFile')

let arrayDatabase = readFileAndConvertJsonToArray('src/data/database.json')

const listBankAccounts = (req, res) => {
    return res.json(arrayDatabase[0].contas)
}

module.exports = {
    listBankAccounts
}