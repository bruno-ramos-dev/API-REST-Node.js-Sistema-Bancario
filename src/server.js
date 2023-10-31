require('dotenv').config()

const express = require('express')

const routes = require('../src/routes/routes')

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.json('API REST Sistema Bancário!'))
app.use(routes)

module.exports = app