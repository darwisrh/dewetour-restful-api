const { user } = require('../models')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { encrypt, compare } = require('../middleware/bcrypt')

const register = async (req, res) => {
  const scheme = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().required(),
    phone: Joi.number().min(9).required(),
    address: Joi.string().required()
  })

  const { error } = scheme.validate(req.body)

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message
      }
    })
  }

  try {
    // Check email if exist
    const oldUser = await user.findOne({
      where: {
        email: req.body.email
      }
    })

    // If email exist then cancel register
    if (oldUser?.email === req.body.email) {
      res.send({
        status: 'error',
        message: 'Email is already registered'
      })
      return
    }

    const hashPass = encrypt(req.body.password)

    // Create new user
    const dataUser = req.body
    const User = await user.create({
      ...dataUser,
      password: hashPass,
      role: 'user'
    })

    const newUser = await user.findOne({
      where: {
        email: User.email
      }
    })

    res.status(200).send({
      status: 'success',
      data: {
        newUser
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    })
  }
}

const login = async (req, res) => {
  const scheme = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

  const { error } = scheme.validate(req.body)

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message
      }
    })
  }

  try {
    // Checking user if exist or not
    const userExist = await user.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!userExist) {
      res.status(400).send({
        message: 'User not found, make sure you register first'
      })
      return
    }

    // Compare password
    const getPassword = compare(req.body.password, userExist.password)
    if (!getPassword) {
      return res.status(400).send({
        status: 'failed',
        message: 'Password is incorrect',
      })
    }

    // Generate token
    const token = jwt.sign({id: userExist.id, name: userExist.name}, process.env.SECRET_KEY)
    res.status(200).send({
      status: 'success',
      data: {
        userExist,
        token
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }

}

module.exports = {
  register,
  login
}