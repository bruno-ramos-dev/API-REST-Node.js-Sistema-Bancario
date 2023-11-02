const { Router } = require('express')
const { validationRequisitionBody } = require('../middlewares/bodyValidation')
const { validAccountCpfAndEmail } = require('../middlewares/accountValidation')
const { deposit, withdraw, transfer } = require('../controllers/transactionsController')
const depositSchema = require('../schemas/depositSchema')
const withdrawSchema = require('../schemas/withdrawSchema')
const transferSchema = require('../schemas/transferSchema')

const routes = Router()

routes.post('/depositar', validationRequisitionBody(depositSchema), validAccountCpfAndEmail, deposit)
routes.post('/sacar', validationRequisitionBody(withdrawSchema), validAccountCpfAndEmail, withdraw)
routes.post('/transferir', validationRequisitionBody(transferSchema), transfer)

module.exports = routes