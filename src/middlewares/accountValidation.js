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

const validAccountCpfAndEmail = (req, res, next) => {

    const { numeroConta } = req.params
    const { cpf, email, numero_conta } = req.body

    let account = arrayDatabase[0].contas.find(account => account.numero === (numeroConta ?? numero_conta))
    if (!account) return res.status(404).json({ mensagem: 'Conta não encontrada em nosso banco de dados' })

    if (cpf !== account.usuario.cpf) {
        const existsCpf = arrayDatabase[0].contas.find(account => account.usuario.cpf === cpf)
        if (existsCpf) return res.status(403).json({ mensagem: 'CPF já está vinculado a outra conta' })
    }

    if (email !== account.usuario.email) {
        const existsEmail = arrayDatabase[0].contas.find(account => account.usuario.email === email)
        if (existsEmail) return res.status(403).json({ mensagem: 'Email já está vinculado a outra conta' })
    }

    req.account = account
    
    next()
}

module.exports = {
    passwordValidation, 
    uniqueCpfValidation, 
    uniqueEmailValidation, 
    validAccountCpfAndEmail
}