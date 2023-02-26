const express = require('express')
const transaction = express()

// Middleware
const { auth } = require('../middleware/auth')
const { uploadFile } = require('../middleware/uploadFile')

// Controller
const {
  createTransaction,
  getAllTrans,
  getTransById,
  deleteTrans,
  updateTrans
} = require('../controller/transaction')

// Routes
transaction.post('/transaction', auth, createTransaction)
transaction.get('/transactions', auth, getAllTrans)
transaction.get('/transaction/:id', auth, getTransById)
transaction.delete('/transaction/:id', auth, deleteTrans)
transaction.patch('/transaction/:id', auth, uploadFile('attachment'), updateTrans)

module.exports = transaction