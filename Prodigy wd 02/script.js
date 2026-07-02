let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function timeToString(time){

    let hrs = Math.floor(time / 3600000);

    let mins = Math.floor((time % 3600000) / 60000);

    let secs = Math.floor((time % 60000) / 1000);

    let ms = Math.floor((time % 1000) / 10);

    hrs = String(hrs).padStart(2,'0');
    mins = String(mins).padStart(2,'0');
    secs = String(secs).padStart(2,'0');
    ms = String(ms).padStart(2,'0');

    return `${hrs}:${mins}:${secs}.${ms}`;
}

function print(txt){
    display.innerHTML = txt;
}

function start(){

    if(!running){

        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(function(){

            elapsedTime = Date.now() - startTime;

            print(timeToString(elapsedTime));

        },10);

        running = true;
    }
}

function pause(){

    if(running){

        clearInterval(timerInterval);

        running = false;
    }
}

function reset(){

    clearInterval(timerInterval);

    running = false;

    elapsedTime = 0;

    print("00:00:00.00");

    laps.innerHTML = "";
}

function lap(){

    if(running){

        const li = document.createElement("li");

        li.textContent = timeToString(elapsedTime);

        laps.appendChild(li);
    }
}

document.getElementById("start").addEventListener("click",start);

document.getElementById("pause").addEventListener("click",pause);

document.getElementById("reset").addEventListener("click",reset);

document.getElementById("lap").addEventListener("click",lap);