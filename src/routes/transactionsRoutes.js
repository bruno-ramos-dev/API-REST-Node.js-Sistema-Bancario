const { Router } = require('express')
const { validationRequisitionBody } = require('../middlewares/bodyValidation')
const depositSchema = require('../schemas/depositSchema')
const { validAccountCpfAndEmail } = require('../middlewares/accountValidation')
const { deposit } = require('../controllers/transactionsController')

const routes = Router()

routes.post('/depositar', validationRequisitionBody(depositSchema), validAccountCpfAndEmail, deposit)

module.exports = routes