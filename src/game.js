import React, { useState } from "react";
import API from "./services/httpService";

export default function Game() {
  const [play, setPlay] = useState(true);
  const [gameCounter, setGameCounter] = useState(1);
  const [result , setResult] = useState(0);
  

  const [game, setGame] = useState({
    id: "",
    firstQuestion: "",
  });
  const [question, setQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const playHandler = async () => {
    try {
      setPlay(false);
      setResult(0);
      const response = await API.post("/game/play", {});
      const { data } = response;
      setGame({
        id: data.gameId,
        firstQuestion: data.questionOne,
      });
   
     
      setQuestion({
        question: data.questionOne.question,
        option1: data.questionOne.option1,
        option2: data.questionOne.option2,
        option3: data.questionOne.option3,
        option4: data.questionOne.option4,
      });
      console.log(data.questionOne.question);
    } catch (err) {
      console.log(err);
    }
  };

    const nextQuestinHandler = async (e) => {
        if (gameCounter < 3) {
             try {
                const response = await API.post("/game/answer", {
                    gameId: game.id,
                    answer: e.target.value,
                });
                const { data } = response;
                const nextQustion = data.nextQuestion;
                setGameCounter(data.gameCounter);
                console.log(data.gameResult);
                setQuestion({
                    question: nextQustion.question,
                    option1: nextQustion.option1,
                    option2: nextQustion.option2,
                    option3: nextQustion.option3,
                    option4: nextQustion.option4,
                });
    
            } catch (err) {
                console.log(err);
            }
        }
        else{
            setPlay(true);
            const response = await API.post("/game/history", {
                gameId: game.id,
            });
            const { data } = response;
            console.log(data);
            setResult(data.result.score);
            setGameCounter(0);
            setQuestion({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                });
            return;
        }
        
    };

  return (
    <div>
      <h1>Game</h1>
      <h2>Question</h2>
      {
            result ? (
                <>
                 <h2>Result</h2>
                <h2>{result}/10</h2>
                </>
            ) : (
                ""
            )
      }
      {play ? (
        ""
      ) : (
        <>
          <h2>{question.question}</h2>
          <button value={"option1"} onClick={nextQuestinHandler}>{question.option1}</button>
          <br />
          <button value={"option2"} onClick={nextQuestinHandler} >{question.option2}</button>
          <br />
          <button value={"option3"} onClick={nextQuestinHandler} >{question.option3}</button>
          <br />
          <button value={"option4"}onClick={nextQuestinHandler} >{question.option4}</button>
          <br />
        </>
      )}
      <button onClick={playHandler}>{play ? "Play" : ""}</button>
    </div>
  );
}
