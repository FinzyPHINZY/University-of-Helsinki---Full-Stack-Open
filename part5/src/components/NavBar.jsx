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

export default NavBar;
