const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React Patterns',
    author: 'Leo',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Clean Code',
    author: 'Robert C.',
    url: 'https://cleancoders.com/videos/clean-code',
    likes: 5,
  },
  {
    title: 'Programming JavaScript for web development',
    author: 'Brian Plank',
    url: 'https://web.dev/',
    likes: 15,
  },
  {
    title: 'The Test Driven Development Book',
    author: 'Kent Beck',
    url: 'https://www.testdrivendevelopment.com/',
    likes: 3,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
