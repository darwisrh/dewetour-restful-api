const { trip, image, country } = require('../models')

const createTrip = async (req, res) => {
  try {
    const dataTrip = req.body
    const newTrip = await trip.create(dataTrip, {
      include: [
        {
          model: image,
          as: 'images'
        },
        {
          model: country,
          as: 'countries'
        }
      ]
    })

    res.send({
      status: 'success',
      data: {
        newTrip
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Server error'
    })
  }
}

const getAllTrip = async (_, res) => {
  try {
    const allTrip = await trip.findAll({
      include: [
        {
          model: image,
          as: 'images'
        },
        {
          model: country,
          as: 'countries'
        }
      ]
    })

    if (!allTrip) {
      return res.send({
        status: 'failed',
        message: 'Trips not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        allTrip
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Server error'
    })
  }
}

const getTripById = async (req, res) => {
  try {
    const { id } = req.params

    const aTrip = await trip.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: image,
          as: 'images'
        },
        {
          model: country,
          as: 'countries'
        }
      ]
    })

    if (!aTrip) {
      return res.send({
        status: 'failed',
        message: 'Trip not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        aTrip
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Server error'
    })
  }
}

const updateTrip = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body

    await trip.update(newData, {
      where: {
        id: id
      }
    })

    const currentTrip = await trip.findOne({
      where: {
        id: id
      }, include: [
        {
          model: image,
          as: 'images'
        },
        {
          model: country,
          as: 'countries'
        }
      ]
    })

    res.send({
      status: 'success',
      data: {
        currentTrip
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'error',
      message: 'Server error'
    })
  }
}

const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params

    await trip.destroy({
      where: {
        id: id
      }
    })

    res.send({
      status: 'success',
      message: `Trip with id = ${id} deleted`
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Server error'
    })
  }
}

module.exports = {
  createTrip,
  getAllTrip,
  getTripById,
  updateTrip,
  deleteTrip
}