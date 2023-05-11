import React, {useContext, useEffect} from 'react';
import './Letter.css';
import { AppContext } from './main';

function Letter({letterPos, attemptVal}) {
    const { board, correctWord, currentAttempt, setDisabledLetters, setAlmostLetters, setCorrectLetters} =  useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
    
    const letterState = currentAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "wrong");
  
    useEffect(() => {
      if(letter !== "" && !correct && !almost){
        setDisabledLetters((prev) => [...prev, letter]);
      } else if(letter !== "" && almost && !correct ) {
        setAlmostLetters((prev) => [...prev, letter]);
      } else if(letter !== "" && correct) {
        setCorrectLetters((prev) => [...prev, letter]);
      }
    }, [currentAttempt.attempt])
    return (
    <div className="board-row-square" id={letterState}> {" "}{letter} </div>
  )
}

export default Letter;

