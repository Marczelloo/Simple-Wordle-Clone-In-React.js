import React, { useContext } from 'react'
import { AppContext } from './main'
import './GameOver.css';

function GameOver() {
    const {gameOver, currentAttempt, correctWord} = useContext(AppContext);

  return (
    <div className="gameOver-container">
        <div className="gameOver">
        <h3>{gameOver.guessedWord ? (<p className='win'>Congratulations you guessed the word!</p>) : (<p className="loose"> You failed</p>) } </h3>
        <h3> Correct word: {correctWord} </h3>
        {gameOver.guessedWord && (<h3> You guessed in {currentAttempt.attempt} attempts </h3>)}
        </div>
    </div>
  )
}

export default GameOver