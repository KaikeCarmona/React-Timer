import { useRef, useState } from "react";

import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [running, setRunning] = useState(false);
  const intervalRef = useRef();

  function start() {
    if (!running) {
      setRunning(true);
      intervalRef.current = setTimeout(watch, 1000);
    }
  }

  function pause() {
    clearTimeout(intervalRef.current);
    setRunning(false);
  }

  function reset() {
    clearTimeout(intervalRef.current);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setRunning(false);
  }

  function watch() {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 59) {
        setMinutes((prevMinutes) => {
          if (prevMinutes === 59) {
            setHours((prevHours) => prevHours + 1);
            return 0;
          }
          return prevMinutes + 1;
        });
        return 0;
      }
      return prevSeconds + 1;
    });
    intervalRef.current = setTimeout(watch, 1000);
    stop()
  }

  return (
    <div>
      <h1>Cronômetro</h1>
      <h4 id="tempo">
        Tempo: {hours}:{minutes}:{seconds}{" "}
      </h4>
      <button onClick={start}>Iniciar</button>
      <button onClick={pause}>Pausar</button>
      <button onClick={reset}>Reiniciar</button>
    </div>
  );
}

export default App;
