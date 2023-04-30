import React, { useState } from "react"
import Timer from "./components/Timer";
import alarmSound from "./components/alarm.wav";

function App() {
  const [sessionTime, setSessionTime] = useState(1);
  const [breakTime, setBreakTime] = useState(1);
  const [changeable, setChangeable] = useState(false);
  const [timer, setTimer] = useState(sessionTime * 60);
  const [minutes, setMinutes] = useState(Math.floor(timer / 60));
  const [seconds, setSeconds] = useState(timer % 60);
  const [switchTimer, setSwitchTimer] = useState("Session");
  const [alarm] = useState(alarmSound);

  // takes a time (in minutes * 60) and sets minutes and seconds accordingly
  function handleTime(time) {
    if (time === 0) {
      if (switchTimer === "Session") {
        setSwitchTimer("Break");
        setTimer(breakTime * 60);
        handleTime(breakTime * 60)
      } else {
          setSwitchTimer("Session");
          setTimer(sessionTime * 60);
          handleTime(sessionTime * 60)
      };
    } else {
      setMinutes(Math.floor(time / 60));
      setSeconds(time % 60);
    };
    
  };

  // handles onClick events for the up and down arrows
  function onClick(arrow, handleFunction, input) {
    if (!changeable){
      if (arrow.match("up") && input < 60) {
        handleFunction(input + 1);
        if (input === sessionTime) {
          if (handleFunction !== setBreakTime){
            handleTime((input * 60) + 60);
          };
        };
      } else if (arrow.match("down") && input > 1) {
        handleFunction(input - 1);
        if (input === sessionTime) {
          if (handleFunction !== setBreakTime) {
            handleTime((input * 60) - 60);
          };
        };
      };
    };
  };

  return (
    <div>
      <h1>25 + 5 Clock</h1>
      <div>
        <h3>Session Length</h3>
        <button 
          onClick={() => onClick("up", setSessionTime, sessionTime)}>up arrow</button>
        <p>{sessionTime}</p>
        <button 
          onClick={() => onClick("down", setSessionTime, sessionTime)}>down arrow</button>
      </div>
      <div>
        <h3>Break Length</h3>
        <button 
          onClick={() => onClick("up", setBreakTime, breakTime)}>up arrow</button>
        <p>{breakTime}</p>
        <button 
          onClick={() => onClick("down", setBreakTime, breakTime)}>down arrow</button>
      </div>
      <Timer 
        sessionTime={sessionTime}
        setSessionTime={setSessionTime}
        breakTime={breakTime}
        setBreakTime={setBreakTime}
        changeable={changeable}
        setChangeable={setChangeable}
        timer={timer}
        setTimer={setTimer}
        minutes={minutes}
        seconds={seconds}
        handleTime={handleTime}
        switchTimer={switchTimer}
        setSwitchTimer={setSwitchTimer}
        alarm={alarm}
      />
    </div>
  );
}

export default App;
