const joi = require('joi')

const transferSchema = joi.object({

    numero_conta_origem: joi.string().trim().required().messages({
        'any.required': 'O campo numero_conta_origem é obrigatório',
        'string.empty': 'O campo numero_conta_origem não pode ser vazio',
        'string.base': 'O campo numero_conta_origem deve ser um texto.'
    }), 
    numero_conta_destino: joi.string().trim().required().messages({
        'any.required': 'O campo numero_conta_destino é obrigatório',
        'string.empty': 'O campo numero_conta_destino não pode ser vazio',
        'string.base': 'O campo numero_conta_destino deve ser um texto.'
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

module.exports = transferSchema