import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  console.log("Course prop: ", course);

  const exercisesSum = course.parts
    .map((part) => part.exercises)
    .reduce((sum, num) => sum + num, 0);

  return (
    <div>
      <Header value={course.name} />
      <Content parts={course.parts} />
      <h3>
        total of {exercisesSum} {exercisesSum > 1 ? "exercises" : "exercise"}
      </h3>
    </div>
  );
};

export default Course;
