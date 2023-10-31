const joi = require('joi')

const accountSchema = joi.object({

    nome: joi.string().trim().min(3).required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome não pode ser vazio',
        'string.min': 'O campo nome deve ter pelo menos 3 caracteres',
        'string.base': 'O campo nome deve ser um texto.'
    }), 
    cpf: joi.string().trim().replace('.', '').replace('-', '').pattern(/^[0-9]+$/).length(11).required().messages({
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf não pode ser vazio',
        'string.base': 'O campo cpf deve ser uma string',
        'string.length': 'O campo cpf deve conter onze números',
        'string.pattern.base': 'O campo cpf deve conter um formato de cpf válido'
    }),
    data_nascimento: joi.string().trim().required().messages({
        'any.required': 'O campo data_nascimento é obrigatório',
        'string.empty': 'O campo data_nascimento não pode ser vazio',
        'string.base': 'O campo data_nascimento deve ser uma string'
    }),
    telefone: joi.string().trim().required().messages({
        'any.required': 'O campo telefone é obrigatório',
        'string.empty': 'O campo telefone não pode ser vazio',
        'string.base': 'O campo telefone deve ser uma string'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email não pode ser vazio',
        'string.email': 'O campo email deve ter o formato de email',
        'string.base': 'O campo email deve ter o formato de email'
    }),
    senha: joi.string().trim().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha não pode ser vazio',
        'string.base': 'O campo senha deve ser uma string'
    })
})

module.exports = accountSchema