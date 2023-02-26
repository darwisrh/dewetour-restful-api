const express = require('express')
const country = express()

// Middleware
const { auth } = require('../middleware/auth')

// Controller
const {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry
} = require('../controller/country')

// Routes
country.post('/country', auth, createCountry)
country.get('/countries', auth, getAllCountries)
country.get('/country/:id', auth, getCountryById)
country.patch('/country/:id', auth, updateCountry)
country.delete('/country/:id', auth, deleteCountry)

module.exports = country