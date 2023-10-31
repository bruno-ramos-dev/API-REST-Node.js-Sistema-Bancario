const { Router } = require('express')
const { passwordValidation, uniqueCpfValidation, uniqueEmailValidation } = require('../middlewares/accountValidation')
const { listBankAccounts, createBankAccount } = require('../controllers/accountController')
const { validationRequisitionBody } = require('../middlewares/bodyValidation')
const accountSchema = require('../schemas/accountSchema')

const routes = Router()

routes.get('/', passwordValidation, listBankAccounts)
routes.post('/', validationRequisitionBody(accountSchema), uniqueCpfValidation, uniqueEmailValidation, createBankAccount)

module.exports = routes