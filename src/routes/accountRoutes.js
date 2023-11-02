const { Router } = require('express')
const { passwordValidation, uniqueCpfValidation, uniqueEmailValidation, validAccountCpfAndEmail } = require('../middlewares/accountValidation')
const { listBankAccounts, createBankAccount, updateUserBankAccount } = require('../controllers/accountController')
const { validationRequisitionBody } = require('../middlewares/bodyValidation')
const accountSchema = require('../schemas/accountSchema')

const routes = Router()

routes.get('/', passwordValidation, listBankAccounts)
routes.post('/', validationRequisitionBody(accountSchema), uniqueCpfValidation, uniqueEmailValidation, createBankAccount)
routes.put('/:numeroConta/usuario', validationRequisitionBody(accountSchema), validAccountCpfAndEmail, updateUserBankAccount)

module.exports = routes