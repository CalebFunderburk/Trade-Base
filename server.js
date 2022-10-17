// Dependencies
const express = require('express')

// Modular code
const sequelize = require('./config/connection')
const routes = require('./routes')

// Format express
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Turn on routes
app.use(routes)

// Turn on connection to db and server
sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
})