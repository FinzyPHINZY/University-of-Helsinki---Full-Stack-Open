const NotificationMessage = ({ status, message }) => {
  if (message === null) {
    return null;
  }
  return <div className={status}>{message}</div>;
};

export default NotificationMessage;
