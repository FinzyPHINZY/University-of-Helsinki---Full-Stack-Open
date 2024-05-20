import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad }) => {
  console.log(good, neutral, bad);
  const all = good + neutral + bad;
  console.log(all);

  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  console.log(average);

  const positive = (good / all) * 100;

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average.toFixed(1)} />
        <StatisticsLine text="positive" value={positive.toFixed(1)} />
      </tbody>
    </table>
  );
};
export default Statistics;
