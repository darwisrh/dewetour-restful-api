const { transaction, trip } = require('../models')

const createTransaction = async (req, res) => {
  try {
    const dataTrans = req.body
    const newTrans = await transaction.create(dataTrans)

    res.send({
      status: 'success',
      data: {
        newTrans
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'error',
      message: 'server error'
    })
  }
}

const getAllTrans = async (req, res) => {
  try {
    const alltrans = await transaction.findAll({
      include: {
        model: trip,
        as: 'trips'
      }
    })

    if (!alltrans) {
      return res.send({
        message: 'Transactions not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        alltrans
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'error',
      message: 'server error'
    })
  }
}

const getTransById = async (req, res) => {
  try {
    const { id } = req.params

    const getTrans = await transaction.findOne({
      where: {
        id: id
      },
      include: {
        model: trip,
        as: 'trips'
      }
    })

    if (!transaction) {
      return res.send({
        message: 'Transaction not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        getTrans
      }
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'error',
      message: 'server error'
    })
  }
}

const deleteTrans = async (req, res) => {
  try {
    const { id } = req.params

    await transaction.destroy({
      where: {
        id: id
      }
    })

    res.send({
      status: 'success',
      message: `Transaction with id = ${id} deleted`
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'error',
      message: 'server error'
    })
  }
}

const updateTrans = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const attachment = req.file.filename

    const newDataContainer = {
      ...newData,
      attachment: attachment ? process.env.PATH_FILE + attachment : null
    }

    await transaction.update(newDataContainer, {
      where: {
        id: id
      }
    })

    const currentUpdate = await transaction.findOne({
      where: {
        id: id
      }
    })

    res.send({
      status: 'success',
      data: {
        currentUpdate
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

module.exports = {
  createTransaction,
  getAllTrans,
  getTransById,
  deleteTrans,
  updateTrans
}