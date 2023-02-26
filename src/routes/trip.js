const express = require('express')
const trip = express()

// Middleware
const { auth } = require('../middleware/auth')

// Controller
const {
  createTrip,
  getAllTrip,
  getTripById,
  updateTrip,
  deleteTrip
} = require('../controller/trip')

// Routes
trip.post('/trip', auth, createTrip)
trip.get('/trips', auth, getAllTrip)
trip.get('/trip/:id', auth, getTripById)
trip.patch('/trip:id', auth, updateTrip)
trip.delete('/trip/:id', auth, deleteTrip)

module.exports = trip