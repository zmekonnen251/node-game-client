import React from 'react'
import  './GameStyle/choiceGame.css'
import ChoiceButton from './choiceButton'

export default function ChoiceGame() {
    const game = ["messi", "ronaldo", "modric", "salah"]
    return (
        <div className='choice'>
            <h3 className='question'>Who won the fifa golden boy award in 2023 ?</h3>

            {
                game.map((item, index) => {
                    return <ChoiceButton key={index} name={item} value={index} />
                }
                )
            }
        </div>
    )
}
