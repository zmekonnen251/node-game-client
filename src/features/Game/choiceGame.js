import React, { useState} from 'react'
import  './GameStyle/choiceGame.css'
import ChoiceButton from './choiceButton'
import { createGame } from './GameApi/createGame'

export default function ChoiceGame() {
    const game = ["messi", "ronaldo", "modric", "salah"]
    const [play, setPlay] = useState(true);
    const [game_id, setGame_id] = useState("");
    const [choice , setChoice] = useState([]);
    const [question, setQuestion] = useState("");
    const [gameResult , setGameResult] = useState(); 
    const [count, setCount] = useState(1);
    const [quesionId , setQuestionId] = useState("");
   

    const playHandler = async () => {
        setPlay(false);
        setCount(1);
        setGameResult(0);
        const response = await createGame();
        setGame_id(response.gameId);
        setQuestionId(response.questionId)
        setQuestion(response.questionOne.question)
        setChoice([response.questionOne.option1, response.questionOne.option2, response.questionOne.option3, response.questionOne.option4])
    }
   
    return (
        <div className='choice'>
            <div className='question-body'>
            {
            play ? 
            <>
                  <button className='play__button' onClick={playHandler}>Play</button>
                   {gameResult ? <h1>Game Result: {gameResult}/10</h1> : null}
            </>
            : null
            }
          
          {
               question ? 
               <>
               <h3 className='question'>{question}</h3>
               {
                   game.map((item, index) => {
                       return <ChoiceButton
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
                        questionId={quesionId}
                        setQuestionId={setQuestionId}
                        />
                   }
                   )
               }
               </> : null
           }      
          
          </div>
        </div>
    )
}
