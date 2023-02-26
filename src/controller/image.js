const { image } = require('../models')

const createImage = async (req, res) => {
  try {
    const name = req.files
    const imageArr = name?.map(item => {
      const newObj = {
        filename: process.env.PATH_FILE + item.filename
      }
      return newObj
    })
    const stringArrImage = JSON.stringify(imageArr)

    const containerData = {
      image: stringArrImage
    }

    const newImage = await image.create(containerData)

    res.send({
      status: 'success',
      data: {
        newImage
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'success',
      message: 'server error'
    })
  }
}

const getAllImage = async (req, res) => {
  try {
    const images = await image.findAll()

    if (!images) {
      return res.send({
        status: 'failed',
        message: 'images not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        images
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'success',
      message: 'server error'
    })
  }
}

const getImageById = async (req, res) => {
  try {
    const { id } = req.params
    const anImage = await image.findOne({
      where: {
        id
      }
    })

    if (!anImage) {
      return res.send({
        status: 'failed',
        message: 'images not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        anImage
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'success',
      message: 'server error'
    })
  }
}

const updateImage = async (req, res) => {
  try {
    const { id } = req.params

    const currentImage = await image.findOne({
      where: {
        id
      }
    })
    const arrObjImg = JSON.parse(currentImage?.image)
    console.log(arrObjImg)

    res.send({
      status: 'success',
      data: {
        currentImage
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'success',
      message: 'server error'
    })
  }
}

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params

    await image.destroy({
      where: {
        id
      }
    })

    res.send({
      status: 'success',
      message: 'Image deleted'
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'success',
      message: 'server error'
    })
  }
}

module.exports = {
  createImage,
  getAllImage,
  getImageById,
  updateImage,
  deleteImage
}