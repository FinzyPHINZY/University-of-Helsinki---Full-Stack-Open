import './App.css';
import { useEffect, useState } from 'react';

import Blogs from './components/Blogs';
import { CreateBlog } from './components/CreateBlog';
import Login from './components/Login';
import NavBar from './components/NavBar';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const savedUserData = window.localStorage.getItem('user');
    if (savedUserData) {
      const userObject = JSON.parse(savedUserData);
      setUser(userObject);
      blogService.setToken(userObject.token); // Set the token here
    }
  }, []);

  // Fetch blogs whenever `user` is set
  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  const fetchBlogs = async () => {
    try {
      const allBlogs = await blogService.getAll();

      setBlogs(allBlogs);
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  };

  const addBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

  const getUser = (data) => {
    setUser(data);
    blogService.setToken(data.token);
    fetchBlogs();
  };

  const handleLogout = () => {
    setUser(null);
    setBlogs([]);
    console.log('User logged out');
  };

  return (
    <div className="app">
      {/* navbar */}
      <NavBar user={user} />
      {/* text bar */}
      {user && (
        <div className="user-status">
          <p className="login-text">{user && `${user.name} is logged in`}</p>
          <button className="logout" onClick={handleLogout}>
            logout
          </button>
        </div>
      )}

      {/* app main content */}
      <main>
        {!user ? (
          <Login fetchUser={getUser} />
        ) : (
          <div>
            <CreateBlog addBlog={addBlog} />
            <Blogs blogs={blogs} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
