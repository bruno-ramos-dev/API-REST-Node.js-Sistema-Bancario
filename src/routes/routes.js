const { Router } = require('express')

const accountRoutes = require('./accountRoutes')

const routes = Router()

routes.use('/contas', accountRoutes)


module.exports = routes
