import { useState } from 'react';
import userService from '../services/user';
import Notification from './Notification';

const Login = ({ fetchUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationStatus, setNotificationStatus] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      const user = { username: username, password: password };
      userService.login(user).then((res) => {
        fetchUser(res);
        setNotification(`Logged in ${res.username} successfully`);
        setNotificationStatus(true);
      });
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('error', error);
      setNotificationStatus(false);
      setNotification(`failed to login -  ${error.response.data.error}`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  };

  return (
    <div className="login">
      <h2>Login to BlogList</h2>
      {notification.length > 1 && (
        <Notification status={notificationStatus} text={notification} />
      )}
      <form onSubmit={handleLogin} className="form">
        <div className="input">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="btn">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
