const _ = require('lodash')

const dummy = (blogs) => {
  if (Array.isArray(blogs)) return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  const highestLikes = Math.max(...blogs.map((blog) => blog.likes))
  return blogs.find((blog) => blog.likes === highestLikes)
}

const mostBlogs = (authors) => {
  return _.maxBy(authors, 'blogs')
}

const mostLikes = (blogs) => {
  return _.maxBy(blogs, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
