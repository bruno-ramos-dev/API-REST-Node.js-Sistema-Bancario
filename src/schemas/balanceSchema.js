const joi = require('joi')

const balanceSchema = joi.object({

    numero_conta: joi.string().trim().required().messages({
        'any.required': 'O campo numero_conta é obrigatório',
        'string.empty': 'O campo numero_conta não pode ser vazio',
        'string.base': 'O campo numero_conta deve ser um texto.'
    }),
    senha: joi.string().trim().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha não pode ser vazio',
        'string.base': 'O campo senha deve ser uma string'
    })
})

module.exports = balanceSchema