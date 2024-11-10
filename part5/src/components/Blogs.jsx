import Blog from './Blog';

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

export default Blogs;
