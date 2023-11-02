const joi = require('joi')

const withdrawSchema = joi.object({

    numero_conta: joi.string().trim().required().messages({
        'any.required': 'O campo numero_conta é obrigatório',
        'string.empty': 'O campo numero_conta não pode ser vazio',
        'string.base': 'O campo numero_conta deve ser um texto.'
    }), 
    valor: joi.number().integer().greater(0).required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.greater': 'O campo valor deve ser um número positivo',
        'number.base': 'O campo valor deve ser um número',
        'number.integer': 'O campo valor deve ser um número inteiro'
    }), 
    senha: joi.string().trim().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha não pode ser vazio',
        'string.base': 'O campo senha deve ser uma string'
    })
})

module.exports = withdrawSchema