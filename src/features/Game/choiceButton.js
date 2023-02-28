import React from 'react'

export default function ChoiceButton({name}) {
    return (
        <div className='choice__buttons'>
            <button className='choice__button'>{name}</button>
        </div>
    )
}
