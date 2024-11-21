import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ status, text }) => {
  return (
    <div className={`notification ${status ? 'true' : 'false'}`}>{text}</div>
  );
};

Notification.propTypes = {
  status: PropTypes.bool,
  text: PropTypes.string,
};

export default Notification;
