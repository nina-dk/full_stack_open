import { useState } from 'react';

const Header = ({ text }) => (
  <div className="header">
    <h2>{text}</h2>
  </div>
);

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ kind, count }) => (
  <tr>
    <td>{kind}</td>
    <td>{count}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const getFeedbackTotal = () => good + neutral + bad;
  const getAverageScore = () => (good - bad) / getFeedbackTotal();
  const getPositivePercentage = () => {
    let percentage = (good / (good + neutral + bad)) * 100;
    return `${percentage} %`;
  };

  if (getFeedbackTotal() === 0) {
    return (
      <div id="statistics">
        <p>No feedback given.</p>
      </div>
    );
  }

  return (
  <div id="statistics">
    <table>
      <tbody>
        <StatisticLine kind={"Good"} count={good} />
        <StatisticLine kind={"Neutral"} count={neutral} />
        <StatisticLine kind={"Bad"} count={bad} />
        <StatisticLine kind={"All"} count={getFeedbackTotal()} />
        <StatisticLine kind={"Average"} count={getAverageScore()} />
        <StatisticLine kind={"Positive"} count={getPositivePercentage()} />
      </tbody>
    </table>
  </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //create button event handler
  const getFeedback = (feedback, updateState) => {
    return () => updateState(feedback + 1);
  };

  return (
    <div>
      <Header text={"Give Feedback"} />
      <Button text={"good"} handleClick={getFeedback(good, setGood)} />
      <Button text={"neutral"} handleClick={getFeedback(neutral, setNeutral)} />
      <Button text={"bad"} handleClick={getFeedback(bad, setBad)} />
      <Header text={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;