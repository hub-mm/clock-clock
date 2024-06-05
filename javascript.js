
const timeChangeButton = document.querySelectorAll('.button-time-change button');
const localButton = document.querySelector('#local');
const minusSixButton = document.querySelector('#minus-six');

const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

let mode = 'local';

localButton.addEventListener('click', () => {
    mode = 'local';
    setTime(mode)
});

minusSixButton.addEventListener('click', () => {
    mode = 'minusSix';
    setTime(mode);
});

function setTime(mode) {
    const dateTime = new Date();
    let hours = dateTime.getHours();

    if (mode === 'local') {
        hours;
    } else if (mode === 'minusSix') {
        hours -= 6;
        if (hours < 0) hours += 24;
    }

    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    const hoursDegrees = ((hours / 12) * 360) + 180;
    const minutesDegrees = ((minutes / 60) * 360) + 180;
    const secondsDegrees = ((seconds / 60) * 360) + 180;

    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const hoursString = hours < 10 ? `0${hours}` : hours;
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;

    const timeFormat = `${hoursString} : ${minutesString} : ${secondsString}`;
    time.textContent = timeFormat;

    if (secondsDegrees == 180 || minutesDegrees == 180 || hoursDegrees == 180) {
        secondHand.style.transition = "none";
        minuteHand.style.transition = "none";
        hourHand.style.transition = "none";
    } else {
        secondHand.style.transition = "";
        minuteHand.style.transition = "";
        hourHand.style.transition = "";
    }
}

function setDate() {
    const dateTime = new Date();
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();

    const dayString = day < 10 ? `0${day}` : day;
    const monthString = month < 10 ? `0${month}` : month;

    const dateFormat = `${dayString} / ${monthString} / ${year}`;
    date.textContent = dateFormat;
}

function blinkTime() {
    if (date.style.visibility === 'hidden') {
        date.style.visibility = 'visible';
        time.style.visibility = 'visible';
    } else {
        date.style.visibility = 'hidden';
        time.style.visibility = 'hidden';
    }
}

console.groupCollapsed('function')
console.log('setTime', setTime);
console.log('setDate', setDate);
console.log('blinkTime', blinkTime);
console.groupEnd();

setInterval(() => setTime(mode), 1000);
setInterval(setDate, 1000);
setInterval(blinkTime, 800);