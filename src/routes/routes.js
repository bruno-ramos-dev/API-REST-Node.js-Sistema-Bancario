const { Router } = require('express')

const accountRoutes = require('./accountRoutes')
const transactionsRoutes = require('./transactionsRoutes')

const routes = Router()

routes.use('/contas', accountRoutes)
routes.use('/transacoes', transactionsRoutes)


module.exports = routes
