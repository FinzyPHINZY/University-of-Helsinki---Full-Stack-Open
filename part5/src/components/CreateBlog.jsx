import { useState } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';

export const CreateBlog = ({ addBlog }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: '',
  });
  const [notification, setNotification] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const result = await blogService.createBlog(formData);
      addBlog(result.data);
      setNotification(`New blog added - ${result.data.title}`);
      setNotificationStatus(true);
    } catch (error) {
      setNotificationStatus(false);
      setNotification(`Failed to add blog - ${error.response.data.error}`);
    }
  };

  return (
    <div className="create">
      <h2 className="">Create New Blog</h2>
      {notification && (
        <Notification status={notificationStatus} text={notification} />
      )}

      {/* CREATE BLOG FORM */}
      <div className="">
        {!showForm ? (
          <div className="btn">
            <button className="btn" onClick={() => setShowForm(true)}>
              Click to Create Blog
            </button>
          </div>
        ) : (
          <div className="form-div">
            <form onSubmit={handleCreateBlog} className="form">
              <div className="input">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="input">
                <label>Author:</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="input">
                <label>URL:</label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      url: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="">
                <div className="btn">
                  <button type="submit">Create</button>
                </div>
              </div>
            </form>
            <button
              className="cancel-btn"
              onClick={() => {
                setShowForm(false);
                setFormData({ title: '', author: '', url: '' });
              }}
            >
              Cancel Create Blog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
