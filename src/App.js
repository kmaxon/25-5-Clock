import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
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
            setTimer((input * 60) + 60);
          };
        };
      } else if (arrow.match("down") && input > 1) {
        handleFunction(input - 1);
        if (input === sessionTime) {
          if (handleFunction !== setBreakTime) {
            handleTime((input * 60) - 60);
            setTimer((input * 60) - 60);
          };
        };
      };
    };
  };

  const appStyle = {
    display: "flex",
    flexWrap: "wrap",
    width: "400px",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  };

  const titleStyle = {
    width: "100%",
    textAlign: "center",
    fontSize: "60px",
    margin: "10px"
  };

  const lengthStyle = {
    display: "flex",
    flexWrap: "wrap",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  };

  const lengthTitleStyle = {
    width: "100%",
    textAlign: "center",
    fontSize: "25px",
    margin: "5px"
  };

  const timeStyle = {
    fontSize: "30px",
    margin: "5px 15px",
  };

  return (
    <div style={appStyle}>
      <h1 style={titleStyle}>25 + 5 Clock</h1>
      <div id="break-label" style={lengthStyle}>
        <h3 style={lengthTitleStyle}>Break Length</h3>
        <button 
          id="break-decrement"
          className="button"
          onClick={() => onClick("down", setBreakTime, breakTime)}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <p id="break-length" style={timeStyle}>{breakTime}</p>  
        <button 
          id="break-increment"
          className="button"
          onClick={() => onClick("up", setBreakTime, breakTime)}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
      <div id="session-label" style={lengthStyle}>
        <h3 style={lengthTitleStyle}>Session Length</h3>
        <button 
          id="session-decrement"
          className="button"
          onClick={() => onClick("down", setSessionTime, sessionTime)}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <p id="session-length" style={timeStyle}>{sessionTime}</p>
        <button 
          id="session-increment"
          className="button"
          onClick={() => onClick("up", setSessionTime, sessionTime)}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
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
