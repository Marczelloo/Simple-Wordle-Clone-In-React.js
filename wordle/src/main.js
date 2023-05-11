import React, {useEffect, createContext, useState} from 'react';
import './main.css';
import Board from './Board';
import Keyboard from './Keyboard';
import { boardDefault } from './Words';
import { generateWordSet } from './Words';
import GameOver from './GameOver';

export const AppContext = createContext();

function Main() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("");

  console.log(correctWord);
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);
  
  const onSelectLetter = (keyValue) =>{
    if(currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyValue;
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos + 1})
  }

  const onDelete = () => {
    if(currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = '';
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1});
  }

  const onEnter = () => {
    if(currentAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttempt.attempt][i];
    }
    
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrentAttempt({attempt: currentAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word not found"); //cutom prompt
    }
  
    if(currWord === correctWord.toUpperCase()) {
      setGameOver({gameOver: true, guessedWord: true})
    }

    if(currentAttempt.attempt === 5){
      setGameOver({gameOver: true, guessedWord: false});
    }
  };


  return (
    <div className="page-container">
      <nav className="navbar">
        Wordle
      </nav>
      <AppContext.Provider 
      value={{board, setBoard, currentAttempt, setCurrentAttempt, 
      onSelectLetter, onDelete, onEnter, correctWord, 
      setDisabledLetters, disabledLetters, almostLetters,
      setAlmostLetters, correctLetters, setCorrectLetters,
      setGameOver, gameOver}}>
        <Board />
        <Keyboard />
        {gameOver.gameOver && <GameOver />}
      </AppContext.Provider>
    </div>
  );
}

export default Main;
