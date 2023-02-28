import React from 'react'
import { createGame } from './GameApi/createGame'

export default function ChoiceButton({name, value}) {
    const choiceHandler = (e) => {
        console.log(e.target.value)
    }
    return (
        <div className='choice__buttons'>
            <button className='choice__button' value={`option${value+1}`} onClick={choiceHandler}>{name}</button>
        </div>
    )
}
