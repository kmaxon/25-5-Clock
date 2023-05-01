import React, {useState, useEffect } from "react";


function Timer(props) {
    // destructures the props
    const {
        sessionTime, 
        setSessionTime,
        breakTime, 
        setBreakTime,
        setChangeable,
        setTimer,
        minutes,
        seconds,
        handleTime,
        switchTimer, 
        setSwitchTimer,
        alarm
    } = props;

    const [running, setRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if  (running) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer - 1;
                    if (newTimer <= 0) {
                        alarm.play();
                        setTimeout(() => {
                            if (switchTimer === "Session") {
                                setSwitchTimer("Break");
                                handleTime(breakTime * 60);
                            } else {
                                setSwitchTimer("Session");
                                handleTime(sessionTime * 60);
                            };
                            setTimer(switchTimer === "Session" ? sessionTime + 60 : breakTime * 60);
                        }, 2000);
                        return prevTimer;
                    }
                    handleTime(newTimer);
                    return newTimer;
                });
            }, 1000);
        };

        return () => clearInterval(intervalId);
    }, [
        running, 
        switchTimer, 
        breakTime, 
        sessionTime, 
        setSwitchTimer,
        setTimer,
        handleTime,
        alarm
    ]);

    function onStartPauseClick() {
        setRunning(prevRunning => !prevRunning);
        setChangeable(false);
    };

    function onResetClick() {
        setRunning(false);
        setChangeable(true);
        setSwitchTimer("Session");
        setSessionTime(25);
        setBreakTime(5);
        setTimer(25 * 60);
        handleTime(25 * 60);
    };

    var timerStyle;

    if (minutes < 1) {
        timerStyle = {
            color: "red",
        };
    } else {
        timerStyle = {
            color: "black",
        };
    };

    return (
        <div id="timer-label" >
            <h3 style={timerStyle}>{switchTimer}</h3>
            <h2 id="time-left" style={timerStyle}>{`${minutes}:${seconds < 10? '0' + seconds : seconds}`}</h2>
            <button id="start_stop" onClick={onStartPauseClick}>{running ? "Pause" : "Start"}</button>
            <button id="reset" onClick={onResetClick}>reset</button>
            <audio id="beep">
                <source src={alarm} type="audio/wav" />
            </audio>
        </div>
    );
};


export default Timer;
