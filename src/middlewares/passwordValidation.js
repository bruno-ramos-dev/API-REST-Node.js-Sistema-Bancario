const { readFileAndConvertJsonToArray } = require('../utils/handleFile')

const arrayDatabase = readFileAndConvertJsonToArray('src/data/database.json')

const passwordValidation = (req, res, next) => {
    const { senha_banco } = req.query
    if (!senha_banco || senha_banco !== arrayDatabase[0].banco.senha) 
        return res.status(403).json({ mensagem: 'A senha não foi fornecida ou está incorreta' })

    next()
}

module.exports = {
    passwordValidation
}