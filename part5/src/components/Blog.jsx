import { useState } from 'react';
import BlogService from '../services/blogs.js';

const Blog = ({ blog }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleView = () => {
    setShowBlogDetails((prev) => !prev);
  };

  const updateLike = async (e) => {
    e.preventDefault();
    try {
      setLikes((prevLikes) => (prevLikes += 1));
      const updatedBlog = { ...blog, likes: likes + 1 };
      const result = await BlogService.updateBlog(updatedBlog);

      console.log(result);
    } catch (error) {
      setLikes((prevLikes) => (prevLikes -= 1));
      console.log('failed to update like', error);
    }
  };

  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this?'
    );

    if (!confirmDelete) return;

    try {
      await BlogService.deleteBlog(blog);
      console.log('blog deleted');
    } catch (error) {
      console.log('failed to delete blog', error);
    }
  };
  return (
    <div className="blog">
      <div className="heading">
        <p className="title">{blog.title}</p>
        <button onClick={handleView}>
          {showBlogDetails ? 'Hide' : 'View'}
        </button>
      </div>

      {showBlogDetails && (
        <div className="body">
          <a href={blog.url}>{blog.url}</a>
          <p>
            Likes: {likes} <button onClick={updateLike}>like</button>
          </p>
          <p className="author">{blog.author}</p>
          <div className="btn">
            <button onClick={deleteBlog}>remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
