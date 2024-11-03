const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <p className="title">{blog.title}</p>-
      <p className="author">{blog.author}</p>
    </div>
  );
};

export default Blog;
