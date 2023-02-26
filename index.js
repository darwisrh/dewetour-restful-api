require('dotenv').config()
const express = require('express')
const app = express()

const http = require('http')

const server = http.createServer(app)

// Routes
const User = require('./src/routes/user')
const Transaction = require('./src/routes/transaction')
const Trip = require('./src/routes/trip')
const Country = require('./src/routes/country')
const ImageRoute = require('./src/routes/image')

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static("uploads"))

// Subroute
app.use('/api/v1', User)
app.use('/api/v1', Transaction)
app.use('/api/v1', Trip)
app.use('/api/v1', Country)
app.use('/api/v1', ImageRoute)

server.listen(port, () => console.log(`Sever on with port : ${port}`))