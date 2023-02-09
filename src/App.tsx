import { useCallback, useEffect, useState } from "react";
import { ReactComponent as IconPlay } from "./icons/ic_play.svg";
import { ReactComponent as IconPause } from "./icons/ic_pause.svg";
import { ReactComponent as IconReset } from "./icons/ic_reset.svg";

const INITIAL_TIME = {
  hour: "00",
  minutes: "00",
  seconds: "00",
};

function App() {
  const [timeout, updateTimeOut] = useState<any>();
  const [counter, setCounter] = useState<number>(0);
  const [time, setTime] = useState(INITIAL_TIME);

  const updateTime = useCallback(() => {
    let datatime = new Date(counter);
    setCounter((prev) => prev + 1000);
    setTime({
      hour: ("0" + datatime.getUTCHours()).slice(-2),
      minutes: ("0" + datatime.getUTCMinutes()).slice(-2),
      seconds: ("0" + datatime.getUTCSeconds()).slice(-2),
    });
  }, [counter]);

  const handleClick = () => {
    if (timeout) {
      clearTimeout(timeout);
      updateTimeOut(null);
    } else {
      setCounter((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCounter(0);
    setTime(INITIAL_TIME);
  };

  useEffect(() => {
    if (timeout) clearTimeout(timeout);

    updateTimeOut(setTimeout(updateTime, 1000));
    return () => {
      clearTimeout(timeout);
      updateTimeOut(null);
    };
    // eslint-disable-next-line
  }, [counter]);

  return (
    <div className="wrapper">
      <div className="container">
        <h1>time</h1>
        <div className="time__wrapper">
          <div className="time">
            <span className="time__value">{time.hour}</span>
            <span className="time__label">Hours</span>
          </div>
          <span className="time__separator">:</span>
          <div className="time">
            <span className="time__value">{time.minutes}</span>
            <span className="time__label">Minutes</span>
          </div>
          <span className="time__separator">:</span>
          <div className="time">
            <span className="time__value">{time.seconds}</span>
            <span className="time__label">Seconds</span>
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleClick}>
            {!timeout ? <IconPlay /> : <IconPause/>}
            <span>{!timeout ? "Play" : "Pause"}</span>
          </button>
          <button onClick={handleReset}><IconReset /><span>Reset</span></button>
        </div>
      </div>
    </div>
  );
}

export default App;
