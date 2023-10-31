const { readFileAndConvertJsonToArray } = require('../utils/handleFile')

const arrayDatabase = readFileAndConvertJsonToArray('src/data/database.json')

const passwordValidation = (req, res, next) => {
    const { senha_banco } = req.query
    if (!senha_banco || senha_banco !== arrayDatabase[0].banco.senha) 
        return res.status(403).json({ mensagem: 'A senha não foi fornecida ou está incorreta' })

    next()
}

const uniqueCpfValidation = (req, res, next) => {
    const { cpf } = req.body

    let providedCpf = arrayDatabase[0].contas.find(newAccount => newAccount.usuario.cpf === cpf)

    if (providedCpf) return res.status(403).json({ mensagem: 'Este CPF já está vinculado a outra conta' })

    next()
}

const uniqueEmailValidation = (req, res, next) => {
    const { email } = req.body

    let providedEmail = arrayDatabase[0].contas.find(newAccount => newAccount.usuario.email === email)

    if (providedEmail) return res.status(403).json({ mensagem: 'Este E-mail já está vinculado a outra conta' })

    next()
}

module.exports = {
    passwordValidation, 
    uniqueCpfValidation, 
    uniqueEmailValidation
}