import React from "react";

const Part = ({ part }) => {
  console.log("Parts item Prop", part);
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Part;
