const { user, transaction } = require('../models')
const cloudinary = require('../middleware/cloudinary')

const getAllUser = async (_, res) => {
  try {
    
    const allUser = await user.findAll({
      include: {
        model: transaction,
        as: 'transactions'
      }
    })

    if (!allUser) {
      return res.send({
        status: 'failed',
        message: 'Not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        allUser
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

const getUserByUUID = async (req, res) => {
  try {
    const { uuid } = req.params

    const userUUID = await user.findOne({
      where: {
        uuid: uuid
      },
      include: {
        model: transaction,
        as: 'transactions'
      }
    })

    if (!userUUID) {
      return res.send({
        status: 'failed',
        message: 'User not found'
      })
    }

    res.send({
      status: 'success',
      data: {
        userUUID
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

const updateUserByUUID = async (req, res) => {
  try {
    const { uuid } = req.params
    const filePath = req.file.path
    
    // Upload to cloudinary
    const upload = await cloudinary.uploader.upload(filePath)

    const newData = {
      ...oldUser,
      image: upload ? upload.secure_url : null // Get file url from cloudinary
    }

    await user.update(newData, {
      where: {
        uuid: uuid
      }
    })

    const newUser = await user.findOne({
      where: {
        uuid: uuid
      }
    })

    res.send({
      status: 'success',
      data: {
        newUser
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

const deleteUser = async (req, res) => {
  try {
    
    const { uuid } = req.params
    
    await user.destroy({
      where: {
        uuid: uuid
      }
    })

    res.send({
      status: 'success',
      message: `User with id = ${uuid} deleted` 
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 'error',
      message: 'server error'
    })
  }
}

module.exports = {
  getAllUser,
  getUserByUUID,
  updateUserByUUID,
  deleteUser
}