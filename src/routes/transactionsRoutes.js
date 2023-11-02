const { Router } = require('express')
const { validationRequisitionBody } = require('../middlewares/bodyValidation')
const { validAccountCpfAndEmail } = require('../middlewares/accountValidation')
const { deposit, withdraw } = require('../controllers/transactionsController')
const depositSchema = require('../schemas/depositSchema')
const withdrawSchema = require('../schemas/withdrawSchema')

const routes = Router()

routes.post('/depositar', validationRequisitionBody(depositSchema), validAccountCpfAndEmail, deposit)
routes.post('/sacar', validationRequisitionBody(withdrawSchema), validAccountCpfAndEmail, withdraw)

module.exports = routes