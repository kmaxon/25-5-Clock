import React, { useState } from "react"
import Timer from "./components/Timer";
import alarmSound from "./components/alarm.wav";

function App() {
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [changeable, setChangeable] = useState(true);
  const [timer, setTimer] = useState(sessionTime * 60);
  const [minutes, setMinutes] = useState(Math.floor(timer / 60));
  const [seconds, setSeconds] = useState(timer % 60);
  const [switchTimer, setSwitchTimer] = useState("Session");
  const [alarm] = useState(new Audio(alarmSound));

  // takes a time (in minutes * 60) and sets minutes and seconds accordingly
  function handleTime(time) {
    setMinutes(Math.floor(time / 60));
    setSeconds(time % 60);
  };

  // handles onClick events for the up and down arrows
  function onClick(arrow, handleFunction, input) {
    if (changeable){
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
      <div id="break-label">
        <h3>Break Length</h3>
        <p id="break-length" >{breakTime}</p>
        <button 
          id="break-decrement"
          onClick={() => onClick("down", setBreakTime, breakTime)}>down arrow</button>
        <button 
          id="break-increment"
          onClick={() => onClick("up", setBreakTime, breakTime)}>up arrow</button>
      </div>
      <div id="session-label">
        <h3>Session Length</h3>
        <p id="session-length" >{sessionTime}</p>
        <button 
          id="session-decrement"
          onClick={() => onClick("down", setSessionTime, sessionTime)}>down arrow</button>
        <button 
          id="session-increment"
          onClick={() => onClick("up", setSessionTime, sessionTime)}>up arrow</button>
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
