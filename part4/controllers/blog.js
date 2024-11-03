const blogRouter = require('express').Router();
const logger = require('../utils/logger');
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', userExtractor, async (request, response) => {
  console.log(await Blog.find({}));
  console.log('request data: ', request.user._id);
  const blogs = await Blog.find({ user: request.user._id })
    .populate({ path: 'user', select: ['username', 'name'] })
    .lean();

  response.status(200).json(blogs);
});

blogRouter.post('/', userExtractor, async (request, response) => {
  const { title, url, author } = request.body;

  const user = request.user;

  if (!url || !title) {
    logger.error('Missing required fields:', request.body);
    return response.status(400).json({ error: 'Missing required fields' });
  }

  if (!request.body.likes) {
    request.body.likes = 0;
  }

  const blog = new Blog({
    title,
    url,
    author,
    likes: request.body.likes,
    user: user.id,
  });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, {
    new: true,
  });

  console.log('UPDATED BLOG: ', updatedBlog);

  if (updatedBlog) {
    response.json(updatedBlog); // Return the updated blog
  } else {
    response.status(404).end(); // Return 404 if the blog is not found
  }
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  if (request.user._id.toString() !== blog.user.toString()) {
    return response
      .status(401)
      .json({ error: 'Unauthorized to delete this blog' });
  }

  await blog.deleteOne();
  response
    .status(204)
    .json({ success: true, message: 'Blog deleted successfully' });
});
module.exports = blogRouter;
