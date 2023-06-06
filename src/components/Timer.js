import React, {useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';
import "./Timer.css";


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
        alarm,
    } = props;

    const [running, setRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if  (running) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer - 1;
                    if (newTimer < 0) {
                        alarm.play();
                        setTimeout(() => {
                            if (switchTimer === "Session") {
                                setSwitchTimer("Break");
                                handleTime(breakTime * 60);
                                setTimer(breakTime * 60);
                            } else {
                                setSwitchTimer("Session");
                                handleTime(sessionTime * 60);
                                setTimer(sessionTime * 60);
                            };
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

    const timerStyle = {};

    if (minutes < 1) {
        timerStyle.borderColor = 'red';
        timerStyle.color = 'red'
    };

    return (
        <div id="timer-container" >
            <div id='timer-display' style={timerStyle}>
                <div id='timer' style={timerStyle}>
                    <h2 id='timer-name' style={timerStyle}>{switchTimer}</h2>
                    <h2 id="time-left" style={timerStyle}>{`${minutes}:${seconds < 10? '0' + seconds : seconds}`}</h2>
                </div>
            </div>
            <button id="start_stop" class="button" onClick={onStartPauseClick}>
                {running ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </button>
            <button id="reset" class="button" onClick={onResetClick}>
                <FontAwesomeIcon icon={faRedo} />
            </button>
            <audio id="beep">
                <source src={alarm} type="audio/wav" />
            </audio>
        </div>
    );
};


export default Timer;
