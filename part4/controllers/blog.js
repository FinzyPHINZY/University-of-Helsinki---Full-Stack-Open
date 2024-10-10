const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, url, author, userId } = request.body
  console.log(userId)

  const user = await User.findById(userId)

  if (!url || !title) {
    logger.error('Missing required fields:', request.body)
    return response.status(400).json({ error: 'Missing required fields' })
  }

  if (!request.body.likes) {
    request.body.likes = 0
  }

  const blog = new Blog({
    title,
    url,
    author,
    likes: request.body.likes,
    user: userId,
  })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params

  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, {
    new: true,
  })

  console.log('UPDATED BLOG: ', updatedBlog)

  if (updatedBlog) {
    response.json(updatedBlog) // Return the updated blog
  } else {
    response.status(404).end() // Return 404 if the blog is not found
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  response
    .status(204)
    .json({ success: true, message: 'Blog deleted successfully' })
})
module.exports = blogRouter
