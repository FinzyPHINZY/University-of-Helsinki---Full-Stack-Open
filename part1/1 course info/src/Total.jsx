const Total = (props) => {
  const total = props.parts
    .map((part) => part.exercises)
    .reduce((sum, num) => sum + num, 0);
  console.log(total);

  return <p>Number of exercises {total}</p>;
};

export default Total;
