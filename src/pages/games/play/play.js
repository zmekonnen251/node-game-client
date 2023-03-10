import React from 'react'
import './play.css'
import { useParams } from 'react-router-dom';
import  ChoiceGame from  '../../../features/Game/choiceGame';

export default function Play() {
    const { gameId } = useParams();

    return (
        <div className='play'>
            {
                gameId === '1' ? <ChoiceGame /> : null

            }
            {
                gameId === '2' ? <h1>Game 2</h1> : null
            }
            {
                gameId === '3' ? <h1>Game 3</h1> : null
            }
            
        </div>
    )
}
