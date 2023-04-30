# App():
- state variable for "session" - initialize at 25
- state variable for "break"- initialize at 5
- state variable to hold true or false whether timer is "running" - initialize false
- handlers for the state variables 
- pass down as props to session component:
    - the 25 minute countdown timer state variable
    - the handler for the state variable
- pass down as props to break component:
    - the 5 minute countdown timer state variable
    - the handler for the state variable
- pass down as props to timer component:
    - all handlers and state variables
# Session():
- up arrow button, increases the session length by 1 minute
- down arrow button, decreases the session length by 1 minute
- make sure there is a lower bound of 1 on the timer length
- when timer is running, dont allow this to change
# break():
- similar to session, with the up/down arrows, lower bound of 1, not allowing change while timer is running
# timer():
- onStartPauseClick():
    - when the start/pause button is clicked, the "running" state variable switches the timer off and on
- onResetClick():
    - resets the session and break variables to 25 + 5 respectfully
    - resets the timer 
- timer():
    - takes the length of session and break as arguments
    - when start/pause button is clicked, start the timer
    - when timer is up, make an alarm sound & start whichever timer isnt currently running
- return:
    - start/pause button
    - reset button


TO DO:
- timer is all fucked again. the changeable varaible is allowing change during the timer running
- alarm at the end of each timer
- add style