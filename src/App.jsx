import React, { useState, useEffect } from "react";
import './App.css';

function App(){

  const[value, setValue] = useState(" ");
  const[listening, setListening] = useState(false);
  const[scientificMode, setScientificMode] = useState(false);

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

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript.trim();
      transcript = replaceWordsWithSymbols(transcript);
      setValue(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };
  };

  const replaceWordsWithSymbols = (transcript) => {
    transcript = transcript.replace(/\.$/, '');
    return transcript
      .replace(/plus/g, '+')
      .replace(/minus/g, '-')
      .replace(/times/g, '*')
      .replace(/divided by/g, '/')
      .replace(/divide by/g, '/');
  };

  const handleScientificFunction = (func) => {
    switch(func) {
      case 'sin':
        setValue(prev => Math.sin(eval(prev)).toString());
        break;
      case 'cos':
        setValue(prev => Math.cos(eval(prev)).toString());
        break;
      case 'tan':
        setValue(prev => Math.tan(eval(prev)).toString());
        break;
      case 'log':
        setValue(prev => Math.log10(eval(prev)).toString());
        break;
      case 'ln':
        setValue(prev => Math.log(eval(prev)).toString());
        break;
      case 'exp':
        setValue(prev => Math.exp(eval(prev)).toString());
        break;
      case '√':
        setValue(prev => Math.sqrt(eval(prev)).toString());
        break;
      case '!':
        setValue(prev => factorial(eval(prev)).toString());
        break;     
      default:
        break;
    }
  };
  const factorial = (num) => {
    if (num < 0) return NaN;
    if (num === 0 || num === 1) return 1;
    for (let i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
  };

  const toggleScientificMode = () => {
    setScientificMode(prev => !prev);
  };


  return(
  
    <div className="container">
      <h1><strong>Simple Calculator</strong></h1>
      <div className="calculator">
        <form>
          <div className="display">
          <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
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
          {scientificMode && (
            <div>
              <div>
              <input type="button" value="sin" onClick={ () => handleScientificFunction('sin') } />
              <input type="button" value="cos" onClick={ () => handleScientificFunction('cos') } />
              <input type="button" value="tan" onClick={ () => handleScientificFunction('tan') } />
              <input type="button" value="log" onClick={ () => handleScientificFunction('log') } />
              </div>
              <div>
              <input type="button" value="ln" onClick={ () => handleScientificFunction('ln') } />
              <input type="button" value="exp" onClick={ () => handleScientificFunction('exp') } />
              <input type="button" value="√" onClick={ () => handleScientificFunction('√') } />
              <input type="button" value="!" onClick={ () => handleScientificFunction('!') } />
              </div>
            </div>
            
          )}
          <div className="mode-buttons">
            <input type="button" value="🎤" onClick={startListening} disabled={listening} />
            <input type="button" value={scientificMode ? "Standard Mode" : "Scientific Mode"} onClick={toggleScientificMode} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;