const { Router } = require('express')
const { passwordValidation } = require('../middlewares/passwordValidation')
const { listBankAccounts } = require('../controllers/accountController')

const routes = Router()

routes.get('/', passwordValidation, listBankAccounts)

module.exports = routes