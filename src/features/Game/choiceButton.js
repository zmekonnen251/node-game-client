import { answerQuestion } from "./GameApi/answerQuestion";
import { useGetNextGameMutation } from "./GameApi/gameApiSlice";


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
  const [getNextGame, { isLoading, isSuccess, isError }] = useGetNextGameMutation();
  const choiceHandler = async (e) => {
    const answer = e.target.value;
    const game_id = game;
    setCount(count + 1);
    console.log(game_id, answer, questionId);
    const {data: response } = await getNextGame({game_id, answer, questionId});
    await setTimer(100);

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
