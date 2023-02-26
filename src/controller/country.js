const { country } = require('../models')

const createCountry = async (req, res) => {
  try {
    const data = req.body

    const newCountry = await country.create(data)

    res.send({
      status: 'success',
      data: {
        newCountry
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Server error'
    })
  }
}

const getAllCountries = async (req, res) => {
  try {
    const allCountry = await country.findAll()

    if (!allCountry) {
      return res.send({
        status: 'failed',
        message: 'countries not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        allCountry
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Server error'
    })
  }
}

const getCountryById = async (req, res) => {
  try {
    const { id } = req.params

    const aCountry = await country.findOne({
      where: {
        id: id
      }
    })

    if (!aCountry) {
      return res.send({
        status: 'failed',
        message: 'country not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        aCountry
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Server error'
    })
  }
}

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body

    await country.update(newData, {
      where: {
        id: id
      }
    })

    const currentCountry = await country.findOne({
      where: {
        id: id
      }
    })

    res.send({
      status: 'success',
      data: {
        currentCountry
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Server error'
    })
  }
}

const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params

    await country.destroy({
      where: {
        id
      }
    })

    res.send({
      status: 'success',
      message: `Country with id = ${id} deleted`
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Server error'
    })
  }
}

module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry
}