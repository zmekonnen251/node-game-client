import React, { useEffect, useState } from "react";
import "./GameStyle/choiceGame.css";
import ChoiceButton from "./choiceButton";
import { createGame } from "./GameApi/createGame";
import Timer from "./timer";
import { answerQuestion } from "./GameApi/answerQuestion";
import {getQuestion} from './GameApi/question';

export default function ChoiceGame() {
  const game = ["messi", "ronaldo", "modric", "salah"];
  const [play, setPlay] = useState(true);
  const [game_id, setGame_id] = useState("");
  const [choice, setChoice] = useState([]);
  const [question, setQuestion] = useState("");
  const [gameResult, setGameResult] = useState();
  const [count, setCount] = useState(1);
  const [questionId, setQuestionId] = useState("");
  const [timer, setTimer] = useState(100);
  const [unanswered, setAnswered] = useState("");
  const [error , setError] = useState("");

  const answerHandler = async (e) => {
    setCount(count + 1);
    const response = await answerQuestion(game_id, unanswered, questionId);
    setTimer(115);

    if (count >= 3) {
      setPlay(true);
      setQuestion("");
      setQuestion("");
      setGameResult(response.gameResult);
      return "";
    }
    setQuestionId(response.questionId);
    setQuestion(response.nextQuestion.question);
    setChoice([
      response.nextQuestion.option1,
      response.nextQuestion.option2,
      response.nextQuestion.option3,
      response.nextQuestion.option4,
    ]);
  }

    useEffect(() => {
      const interval = setInterval(() => {
        if (timer === 0 && count <= 3) {
            answerHandler();
            setTimer(100);
            return;
        }
        setTimer((timer) => timer - 1);
        }, 100);
        return () => clearInterval(interval);
    }, [timer]);

  const playHandler = async () => {
    const response = await createGame();
    if(response.status === 200) {
        setError('');
        setTimer(110);
        setPlay(false);
        setCount(1);
        setGameResult(0);
        setGame_id(response.gameId);
        setQuestionId(response.questionId);
        setQuestion(response.questionOne.question);
        setChoice([
          response.questionOne.option1,
          response.questionOne.option2,
          response.questionOne.option3,
          response.questionOne.option4,
        ]);
        return;
    }
    if(response.response.data.message){
        setError(response.response.data.message);
        setCount(10)
        return;
    }
    setError(response.response.statusText);
    setCount(10)
    return '';
  };

    const fetchquestion = async () => {
        const response = await getQuestion();
        console.log(response);
    }

  return (
    <div className="choice">
      <div className="question-body">
        {
            error ? <h1>{error}</h1> : null
        }
        {play ? (
          <>
            <button className="play__button" onClick={playHandler}>
              Play
            </button>
            <button onClick={fetchquestion}>question</button>
            {gameResult ? <h1>Game Result: {gameResult}/10</h1> : null}
          </>
        ) : null}

        {question ? (
          <>
            <div className="question-container">
              <Timer timer={timer} />
              <h1 className="question">{question}</h1>
            </div>
            <span className="question-mark">?</span>
            <div className="timer"></div>
            {game.map((item, index) => {
              return (
                <ChoiceButton
                  key={index}
                  choice={choice}
                  value={index}
                  game={game_id}
                  setChoice={setChoice}
                  setQuestion={setQuestion}
                  setGameResult={setGameResult}
                  setPlay={setPlay}
                  setCount={setCount}
                  count={count}
                  questionId={questionId}
                  setQuestionId={setQuestionId}
                  setTimer={setTimer}
                />
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
}
