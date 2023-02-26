const express = require('express')
const user = express()

// Middleware
const { auth } = require('../middleware/auth')
const { uploadFile } = require('../middleware/uploadFile')

// Authenticate
const {
  register,
  login
} = require('../controller/auth')

// User
const {
  getAllUser,
  getUserByUUID,
  updateUserByUUID,
  deleteUser
} = require('../controller/user')

// Auth
user.post('/register', register)
user.post('/login', login)

// User
user.get('/users', getAllUser)
user.get('/user/:uuid', getUserByUUID)
user.patch('/user/:uuid', auth, uploadFile('image'), updateUserByUUID)
user.delete('/user/:uuid', auth, deleteUser)

module.exports = user