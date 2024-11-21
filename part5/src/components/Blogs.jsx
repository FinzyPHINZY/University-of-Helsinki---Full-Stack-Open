import React from 'react';
import Blog from './Blog';
import PropTypes from 'prop-types';

const Blogs = ({ blogs }) => {
  return (
    <div className="blogs">
      <h2>Blogs</h2>

      <div className="blogs-div">
        {blogs.map((blog, index) => (
          <div key={blog._id + index}>
            <Blog blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      likes: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
      author: PropTypes.string,
    })
  ),
};

export default Blogs;
