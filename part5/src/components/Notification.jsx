const Notification = ({ status, text }) => {
  return (
    <div className={`notification ${status ? 'true' : 'false'}`}>{text}</div>
  );
};

export default Notification;
