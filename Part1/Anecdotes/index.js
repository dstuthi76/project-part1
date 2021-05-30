import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Heading = (props) => <h2>{props.text}</h2>;

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Anecdote = (props) => {
  return (
    <>
      {props.anecdote}
      <br />
      has {props.votes} vote(s)
    </>
  );
};

const MostVoted = (props) => {
  return (
    <>
     <i> <Heading text="Anecdote with Most Votes" />
      {!props.hasVotes && <>No anecdotes have been voted on yet.</>}
      {props.hasVotes && (
        <Anecdote anecdote={props.anecdote} votes={props.votes} />
      )}
      </i>
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const [hasVotes, setHasVotes] = useState(false);

  const getRandomIdx = (length) => {
    return Math.floor(Math.random() * length);
  };

  const setNewRandomAnecdote = () => {
    let randomAnecdoteIdx;

    do {
      randomAnecdoteIdx = getRandomIdx(props.anecdotes.length);
    } while (randomAnecdoteIdx === selected);

    setSelected(randomAnecdoteIdx);
  };

  const incrementVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    setHasVotes(true);
  };

  const handleButtonClick = (type) => {
    switch (type) {
      case "next":
        setNewRandomAnecdote();
        break;
      case "vote":
        incrementVote();
        break;
      default:
        break;
    }
  };

  const maxVote = votes.reduce(
    (acc, num, idx) => {
      if (num > acc.num) {
        acc.num = num;
        acc.idx = idx;
      }

      return acc;
    },
    { num: 0 }
  );

  const maxVotedAnecdote = anecdotes[maxVote.idx];

  return (
    <div>
     <b><i> <Heading text="Anecdote of the Day" /></i></b>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <Button onClick={() => handleButtonClick("vote")} text="vote" />
      <Button onClick={() => handleButtonClick("next")} text="next anecdote" />
      <MostVoted
        hasVotes={hasVotes}
        anecdote={maxVotedAnecdote}
        votes={maxVote.num}
      />
    </div>
  );
};

const anecdotes = [
   "If it hurts, do it more",
  "Adding manpower to a weak that means late software project makes it consume more time!",
  "The first 90% of the code accounts for the first 90% of the development time.The remaining 10 percent of the code accounts for the other 90% of the development time.",
  "bad programmers can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root for all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));



export default App
