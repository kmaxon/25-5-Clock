import React, {useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';
import "../App.css";


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

    const timerStyle = {
        display: "flex",
        flexWrap: "wrap",
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
    };

    const contentStyle = {
        backgroundColor: "white",
        width: "100%",
        border: "5px solid black",
        borderRadius: "20px",
        margin: "10px",
        color: "black",
        textAlign: "center",
    };

    var sessionStyle = {
        fontSize: "25px",
        margin: "20px 10px 10px 10px",
    };

    var textStyle = {
        fontSize: "60px",
        margin: "10px",
    };

    if (minutes < 1) {
        textStyle.color = "red";
        sessionStyle.color = "red";
        contentStyle.borderColor = "red";
    };



    return (
        <div id="timer-label" style={timerStyle} >
            <div style={contentStyle}>
                <h2 style={sessionStyle}>{switchTimer}</h2>
                <h2 id="time-left" style={textStyle}>{`${minutes}:${seconds < 10? '0' + seconds : seconds}`}</h2>
            </div>
            <button id="start_stop" className="button" onClick={onStartPauseClick}>
                {running ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </button>
            <button id="reset" className="button" onClick={onResetClick}>
                <FontAwesomeIcon icon={faRedo} />
            </button>
            <audio id="beep">
                <source src={alarm} type="audio/wav" />
            </audio>
        </div>
    );
};


export default Timer;
