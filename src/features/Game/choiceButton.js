import { answerQuestion } from "./GameApi/answerQuestion";
import { gameResult } from "./GameApi/gameResult";
import { useState } from "react";

export default function ChoiceButton({
  choice,
  value,
  game,
  setChoice,
  setQuestion,
  setGameResult,
  setPlay,
  setCount,
  count,
  questionId,
  setQuestionId,
  setTimer,
}) {
  const choiceHandler = async (e) => {
    const answer = e.target.value;
    const game_id = game;
    setCount(count + 1);
    const response = await answerQuestion(game_id, answer, questionId);
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
  };
  return (
    <div className="choice__buttons">
      <button
        className="choice__button"
        value={`option${value + 1}`}
        onClick={choiceHandler}
      >
        {choice[value]}
      </button>
    </div>
  );
}
