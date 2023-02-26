const express = require('express')
const image = express()

// Midlleware
const { uploadFile } = require('../middleware/uploadFile')
const { auth } = require('../middleware/auth')

// Controller
const {
  createImage,
  getAllImage,
  getImageById,
  updateImage,
  deleteImage
} = require('../controller/image')

// Routes
image.post('/image', auth, uploadFile('image', 5), createImage)
image.get('/images', auth, getAllImage)
image.get('/image/:id', auth, getImageById)
image.patch('/image/:id', auth, uploadFile('name', 5), updateImage)
image.delete('/image/:id', auth, deleteImage)

module.exports = image