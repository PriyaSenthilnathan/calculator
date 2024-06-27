import React, { useState, useEffect } from "react";
import './App.css';

function App(){

  const[value, setValue] = useState(' ');

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      if ((key >= '0' && key <= '9') || key === '.' || key === '/' || key === '*' || key === '-' || key === '+') {
        setValue(prev => prev + key);
      } else if (key === 'Enter') {
        setValue(prev => eval(prev).toString());
      } else if (key === 'Backspace') {
        setValue(prev => prev.slice(0, -1));
      } else if (key === 'Escape') {
        setValue(' ');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return(
  
    <div className="container">
      <h1><strong>Simple Calculator</strong></h1>
      <div className="calculator">
        <form>
          <div className="display">
            <input type = "text" value={value} />
          </div>
          <div>
            <input type = "button" value = "AC" onClick={e => setValue(' ')} />
            <input type = "button" value = "⌫" onClick={e => setValue(value.slice(0,-1))} />
            <input type = "button" value = "." onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "/" onClick={ e => setValue( value + e.target.value)} />
          </div>
          <div>
            <input type = "button" value = "7" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "8" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "9" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "*" onClick={ e => setValue( value + e.target.value)} />
          </div>
          <div>
            <input type = "button" value = "4" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "5" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "6" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "+" onClick={ e => setValue( value + e.target.value)} />
          </div>
          <div>
            <input type = "button" value = "1" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "2" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "3" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "-" onClick={ e => setValue( value + e.target.value)} />
          </div>
          <div>
            <input type = "button" value = "00" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "0" onClick={ e => setValue( value + e.target.value)} />
            <input type = "button" value = "=" className="equal" onClick={ e => setValue(eval(value))}/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;