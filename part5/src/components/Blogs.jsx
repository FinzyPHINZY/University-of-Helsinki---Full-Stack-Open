import Blog from './Blog';

const Blogs = ({ blogs }) => {
  return (
    <div className="blogs">
      <h2>Blogs</h2>

      <ul>
        {blogs.map((blog, index) => (
          <li key={blog._id + index}>
            <Blog blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
