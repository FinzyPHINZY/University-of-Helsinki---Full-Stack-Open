const User = require('../models/user')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({}).populate('blogs', 'author').lean()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).send({ error: 'Server error', message: error.message })
  }
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // const existingUser = await User.findOne({ username })

  // if (existingUser) {
  //   return response
  //     .status(400)
  //     .json({ error: 'expected `username` to be unique' })
  // }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter
