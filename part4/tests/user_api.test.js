const { describe, beforeEach, after } = require('node:test')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { test } = require('node:test')
const { usersInDb } = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const { default: mongoose } = require('mongoose')

const api = supertest(app)
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('realghostdark', 10)

  const user = new User({
    username: 'finzyphinzy',
    name: 'Boluwatife',
    passwordHash,
  })

  await user.save()
})

describe('when there is initially one user at db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'realghostdark',
      name: 'Real Ghost Dark',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)

    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'finzyphinzy',
      name: 'Real Ghost Dark',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('validating user credentials', () => {
  test('should fail to create user if username is less than three (3) characters', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'fi',
      name: 'John Doe',
      password: 'password',
    }

    const result = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()
    console.log(result.body.error)

    assert(
      result.body.error.includes('Username must be at least 3 characters long')
    )
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
  test('should fail to create user if password is less than three (8) characters', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'random',
      name: 'John Doe',
      password: 'pass',
    }

    const result = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()

    assert(
      result.body.error.includes('Password must be at least 3 characters long')
    )
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
