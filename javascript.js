const timeChangeButton = document.querySelectorAll('.button-time-change button');
const local = document.querySelector('#local');
const minus = document.querySelector('#minus');
const plus = document.querySelector('#plus');

const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const blinkSwitch = document.querySelector('#blink');

let btn = 'off';
let blinkInterval = 800;
let interval = 1000;

const title = 'past time . . .';
const typeWriteTime = 500;
let num = 0;

function typeWrite() {
    if (num < title.length) {
        document.querySelector('.title').innerHTML += title.charAt(num);
        num++;
        setTimeout(typeWrite, typeWriteTime);
        return (!typeWrite);
    }
}
setInterval(typeWrite(), typeWriteTime);

let mode = 'local';

local.addEventListener('click', () => {
    mode = 'local';
    setTime(mode);
    setDate(mode);
});

minus.addEventListener('click', () => {
    mode = 'minus';
    setTime(mode);
    setDate(mode);
});

plus.addEventListener('click', () => {
    mode = 'plus';
    setTime(mode);
    setDate(mode);
})

blinkSwitch.addEventListener('click', () => {
    if (btn === 'on') {
        btn = 'off';
        blink(btn);
    } else {
        btn = 'on';
        blink(btn);
    }
});

function setTime(mode) {
    const dateTime = new Date();
    let hours = dateTime.getHours();

    if (mode === 'local') {
        hours;
        local.style.backgroundColor = 'white';
        local.style.color = 'black';
        minus.style.backgroundColor = 'black';
        minus.style.color = 'white';
        plus.style.backgroundColor = 'black';
        plus.style.color = 'white';
    } else if (mode === 'minus') {
        hours -= 5;
        if (hours < 0) hours += 24;
        local.style.backgroundColor = 'black';
        local.style.color = 'white';
        minus.style.backgroundColor = 'white';
        minus.style.color = 'black';
        plus.style.backgroundColor = 'black';
        plus.style.color = 'white';
    } else if (mode === 'plus') {
        hours += 5;
        if (hours > 24) hours -= 24;
        local.style.backgroundColor = 'black';
        local.style.color = 'white';
        minus.style.backgroundColor = 'black';
        minus.style.color = 'white';
        plus.style.backgroundColor = 'white';
        plus.style.color = 'black';
    };

    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    const hoursDegrees = ((hours / 12) * 360) - 90;
    const minutesDegrees = ((minutes / 60) * 360) - 90;
    const secondsDegrees = ((seconds / 60) * 360) - 90;

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

    const clock = document.querySelector('.clock');

    if (hours >= 6 && hours <= 18) {
        clock.style.boxShadow = '0 0 24px 2px darkorange';
    } else {
        clock.style.boxShadow = '0 0 24px 2px whitesmoke';
    }
}

function setDate(mode) {
    const dateTime = new Date();
    let day = dateTime.getDate();
    let hours = dateTime.getHours();
    const hoursString = hours < 10 ? `0${hours}` : hours;

    if (mode === 'plus') {
        hours += 5;
        if (hours >= 24) {
            day += 1;
        }
    } else if (mode === 'minus') {
        hours -= 5;
        if (hours <= 24) {
            day -= 1;
        }
    }

    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();

    const dayString = day < 10 ? `0${day}` : day;
    const monthString = month < 10 ? `0${month}` : month;

    const dateFormat = `${dayString} / ${monthString} / ${year}`;
    date.textContent = dateFormat;
}


function blink(btn) {
    if (btn === 'on') {
        if (date.style.visibility === 'hidden') {
            date.style.visibility = 'visible';
            time.style.visibility = 'visible';
        } else {
            date.style.visibility = 'hidden';
            time.style.visibility = 'hidden';
        }
    } else {
        date.style.visibility = 'visible';
        time.style.visibility = 'visible';
    }
}


setInterval(() => setTime(mode), interval);
setInterval(() => setDate(mode), interval);
setInterval(() => blink(btn), blinkInterval);