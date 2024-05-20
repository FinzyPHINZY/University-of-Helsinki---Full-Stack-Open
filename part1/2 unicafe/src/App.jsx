import { useState } from "react";
import Statistics from "./Statistics";

const Button = () => {
  return (
    <div>
      <h1>hello my gee</h1>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood((prev) => (prev += 1));

  const incrementNeutral = () => setNeutral((prev) => (prev += 1));

  const incrementBad = () => setBad((prev) => (prev += 1));

  return (
    <div>
      <h1>give feedback</h1>
      {/* buttons */}
      <div className="buttons">
        <button onClick={incrementGood}>good</button>
        <button onClick={incrementNeutral}>neutral</button>
        <button onClick={incrementBad}>bad</button>
      </div>

      <h2>statistics</h2>

      {good || bad || neutral ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

export default App;
