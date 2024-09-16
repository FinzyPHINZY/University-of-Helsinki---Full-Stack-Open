const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const { initialBlogs } = require('./test_helper')
const { describe } = require('node:test')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there are existing blog objects', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('the first blog is about React Patterns', async () => {
    const response = await api.get('/api/blogs')
    const blogTitle = response.body.map((blog) => blog.title)

    assert.strictEqual(blogTitle[0], 'React Patterns')
  })
})

describe('when adding a new blog', () => {
  test('should default likes to 0 if likes is not provided', async () => {
    // create a new blog without liks
    const newBlog = {
      title: 'Programming JavaScript for web development',
      author: 'Brian Plank',
      url: 'https://web.dev/',
    }

    const response = await api.post('/api/blogs').send(newBlog) // check response to see the value of likes
    console.log(response.body)
    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title should not be added', async () => {
    const newBlog = {
      author: 'Kent Beck',
      url: 'https://www.testdrivendevelopment.com/',
      likes: 3,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('blog without url should not be added', async () => {
    const newBlog = {
      title: 'Clean Architecture',
      author: 'Kent Beck',
      likes: 3,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('ensure new blog is created and count increases by one', async () => {
    const initialBlogs = await Blog.find({})
    const initialCount = initialBlogs.length

    const newBlog = {
      title: 'lets chat TDD',
      author: 'finzyphinzy',
      url: 'hashnode.dev',
      likes: 202242,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    const updatedBlogs = await Blog.find({})
    const updatedCount = updatedBlogs.length

    assert.strictEqual(updatedCount, initialCount + 1)

    const savedBlog = updatedBlogs.find((blog) => blog.title === newBlog.title)
    assert.strictEqual(savedBlog.title, newBlog.title)
    assert.strictEqual(savedBlog.author, newBlog.author)
    assert.strictEqual(savedBlog.url, newBlog.url)
    assert.strictEqual(savedBlog.likes, newBlog.likes)
  })
})

describe('when fetching blogs', () => {
  test('unique identifier is .id and not ._id', async () => {
    const response = await api.get('/api/blogs')
    const uid = response.body.map((r) => r.id)
    logger.info(uid)
  })
})

describe('when updating a blog', async () => {
  const blogs = await api.get('/api/blogs')

  test('update the title of the blog', async () => {
    const blogToUpdate = blogs.body[0]
    blogToUpdate.title = 'Setting up Supabase with the Prisma ORM'
    console.log(blogToUpdate)

    // ============================
    const updatedResponse = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
    console.log('updatedResponse: ', updatedResponse.body)
    assert.strictEqual(updatedResponse.body[0].title, blogToUpdate.title)
  })
})

describe('when deleting a blog', async () => {
  const blogs = await api.get('/api/blogs')

  const blogToDelete = blogs.body[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`)

  const response = await api.get('/api/blogs')

  test('should blogToDelete title should not be found in titles array', async () => {
    const titles = response.body.map((blog) => blog.title)
    assert.ok(!titles.includes(blogToDelete.title))
  })

  test('Blogs length should be equal to 3', () => {
    assert.strictEqual(response.body.length, blogs.body.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
