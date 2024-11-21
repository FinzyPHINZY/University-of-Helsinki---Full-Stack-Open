import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({ user }) => {
  return (
    <header>
      <nav>
        {!user ? (
          <p>BlogList</p>
        ) : (
          <p className="navuser">
            Welcome to BlogList,<span>{user.name.split(' ')[0]}</span>
          </p>
        )}
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default NavBar;
