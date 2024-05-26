import React from "react";

const Header = ({ value }) => {
  console.log("Header Text", value);
  return <h1>{value}</h1>;
};

export default Header;
