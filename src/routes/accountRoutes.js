const { Router } = require('express')
const { passwordValidation, uniqueCpfValidation, uniqueEmailValidation, validateAccountCpfAndEmailPassingByBodyAndParams, validateAccountAndPasswordPassingByQuery } = require('../middlewares/accountValidation')
const { listBankAccounts, createBankAccount, updateUserBankAccount, deleteBankAccount, balance, invoice } = require('../controllers/accountController')
const { validationRequisitionBody } = require('../middlewares/bodyValidation')
const { validationRequisitionQuery } = require('../middlewares/queryValidation')
const accountSchema = require('../schemas/accountSchema')
const balanceSchema = require('../schemas/balanceSchema')

const routes = Router()

routes.get('/', passwordValidation, listBankAccounts)
routes.post('/', validationRequisitionBody(accountSchema), uniqueCpfValidation, uniqueEmailValidation, createBankAccount)
routes.put('/:numeroConta/usuario', validationRequisitionBody(accountSchema), validateAccountCpfAndEmailPassingByBodyAndParams, updateUserBankAccount)
routes.delete('/:numeroConta', validateAccountCpfAndEmailPassingByBodyAndParams, deleteBankAccount)

routes.get('/saldo', validationRequisitionQuery(balanceSchema), validateAccountAndPasswordPassingByQuery, balance)
routes.get('/extrato', validationRequisitionQuery(balanceSchema), validateAccountAndPasswordPassingByQuery, invoice)

module.exports = routes