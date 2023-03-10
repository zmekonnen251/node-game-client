import React from 'react'

export default function GamePlay({ playHandler, gameResult}) {
    return (
        <div className='play-container'>
          <h1>Quiz</h1>
          {gameResult ? <h1>Game Result: {gameResult}/3</h1> : null}
          <p>Win up to 10000 with football game</p>
          <div className='play-buttons'>
              <button className="play__button" onClick={playHandler}>Play</button>
              <button className='how-to-play'>How to Play</button>
          </div>
        </div>
    )
}
