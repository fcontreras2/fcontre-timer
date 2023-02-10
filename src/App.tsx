import { useCallback, useEffect, useState } from "react";
import { ReactComponent as IconPlay } from "./icons/ic_play.svg";
import { ReactComponent as IconPause } from "./icons/ic_pause.svg";
import { ReactComponent as IconReset } from "./icons/ic_reset.svg";

function App() {
  const [currentInterval, setCurrentInterval] = useState<any>();
  const [counter, setCounter] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  useEffect(() => {
    if (timerOn) {
      setCurrentInterval(
        setInterval(() => {
          setCounter((prevTime) => prevTime + 10);
        }, 10)
      );
    } else if (!timerOn) {
      clearInterval(currentInterval);
    }
    return () => clearInterval(currentInterval);
  }, [timerOn]);

  console.log("A")
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Timer</h1>
        <div className="time__wrapper">
          <div className="time">
            <span className="time__value">
              {("0" + Math.floor(counter / 3600000)).slice(-2)}
            </span>
            <span className="time__label">Hours</span>
          </div>
          <span className="time__separator">:</span>
          <div className="time">
            <span className="time__value">
              {("0" + Math.floor((counter / 60000) % 60)).slice(-2)}
            </span>
            <span className="time__label">Minutes</span>
          </div>
          <span className="time__separator">:</span>
          <div className="time">
            <span className="time__value">
              {("0" + Math.floor((counter / 1000) % 60)).slice(-2)}
            </span>
            <span className="time__label">Seconds</span>
          </div>
          <span className="time__separator">:</span>
          <div className="time">
            <span className="time__value">
              {("0" + ((counter / 10) % 100)).slice(-2)}
            </span>
            <span className="time__label">ms</span>
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              setTimerOn(!timerOn);
            }}
          >
            {!timerOn ? <IconPlay /> : <IconPause />}
            <span>{!timerOn ? "Play" : "Pause"}</span>
          </button>

          <button
            onClick={() => {
              setCounter(0);
              setTimerOn(false);
            }}
          >
            <IconReset />
            <span>{"Reset"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
