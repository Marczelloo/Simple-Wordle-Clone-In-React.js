import React, {useContext} from 'react';
import './Key.css';
import  {AppContext} from './main';

function Key({ keyValue, bigKey, disabled, almost, correct}) {
    const {onSelectLetter, onDelete, onEnter } = useContext(AppContext);

    const selectLetter = () => {
      if(keyValue === "ENTER"){
        onEnter();
      } else if(keyValue === "DELETE") {
          onDelete();
      } else {
        onSelectLetter(keyValue);
    }
  }
  return (
    <div className="key" id={bigKey ? "wide":correct 
    ? "correct": almost ? "almost" : disabled && "disabled"} onClick={selectLetter}> 
        {keyValue} 
    </div>
  )
}

export default Key