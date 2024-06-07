const body = document.querySelector('body');

const timeChangeButton = document.querySelectorAll('.button-time-change button');
const local = document.querySelector('#local');
const minus = document.querySelector('#minus');
const plus = document.querySelector('#plus');


const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const hand = document.querySelector('.hand');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const blinkSwitch = document.querySelector('#blink');
const radiusSwitch = document.querySelector('#radius');
const clockSwitch = document.querySelector('#hide');
const fontSwitch = document.querySelector('#font');

const rangeSlider = document.querySelector('#range-slider');
const timeDate = document.querySelector('.time-date');

const clock = document.querySelector('.clock-face');

const title = 'past time ... |';
const typeWriteTime = 500;
let num = 0;

let mode = 'local';

let blinkInterval = 800;
let interval = 1000;

let btn = 'off';
let clockFace = document.querySelector('.clock-face');
let shape = 'circle';
let clockVisible = 'true';
let fontStyle = 'tiny5';


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

radiusSwitch.addEventListener('click', () => {
    if (shape === 'rectangle') {
        btn = 'circle';
        radius(shape);
    } else {
        btn = 'rectangle';
        radius(shape);
    }
});

clockSwitch.addEventListener('click', () => {
    if (clockVisible === 'true') {
        clockVisible = 'false';
        hideClock(clockVisible);
    } else {
        clockVisible = 'true';
        hideClock(clockVisible);
    }
});

rangeSlider.addEventListener('input', function changeSliderValue() {
    let value = this.value;
    timeDate.style.fontSize = `${value}px`;

    let clockSize = parseInt(500) - parseInt(value);
    let hourHandSize = parseInt(340) - (2 * parseInt(value));
    let minuteHandSize = parseInt(460) - (2 * parseInt(value));
    let secondHandSize = parseInt(480) - (2 * parseInt(value));

    clock.style.height = `${clockSize}px`;
    clock.style.width = `${clockSize}px`;
    hourHand.style.width = `${hourHandSize}px`;
    minuteHand.style.width = `${minuteHandSize}px`;
    secondHand.style.width = `${secondHandSize}px`;

    hourHand.style.transition = 'all .1s';
    minuteHand.style.transition = 'all .1s';
    secondHand.style.transition = 'all .1s';

    if (value > 84) {
        let hourHandSize = parseInt(340) - (2.5 * parseInt(value));
        let minuteHandSize = parseInt(460) - (3.4 * parseInt(value));
        let secondHandSize = parseInt(480) - (3.4 * parseInt(value));
        clock.style.height = `${clockSize}px`;
        clock.style.width = `${clockSize}px`;
        hourHand.style.width = `${hourHandSize}px`;
        minuteHand.style.width = `${minuteHandSize}px`;
        secondHand.style.width = `${secondHandSize}px`;
    }
});

fontSwitch.addEventListener('click', () => {
    if (fontStyle === 'tiny5') {
        fontStyle = 'roboto';
        changeFont(fontStyle);
    } else {
        fontStyle = 'tiny5';
        changeFont(fontStyle);
    }
})


function typeWrite() {
    if (num < title.length) {
        document.querySelector('.title').innerHTML += title.charAt(num);
        num++;
        setTimeout(typeWrite, typeWriteTime);
    } else {
        setTimeout(() => {
            document.querySelector('.title').innerHTML = '';
            num = 0;
            typeWrite();
        }, 100);
    }
}

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

    const hoursDegrees = ((hours / 12) * 360) + 270;
    const minutesDegrees = ((minutes / 60) * 360) + 270;
    const secondsDegrees = ((seconds / 60) * 360) + 270;

    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    hourHand.style.transition = 'transform .5s cubic-bezier(0, 2.31, 1, 0.74)';
    minuteHand.style.transition = 'transform .5s cubic-bezier(0, 2.31, 1, 0.74)';
    secondHand.style.transition = 'transform .5s cubic-bezier(0, 2.31, 1, 0.74)';

    if (seconds === 0) {
        secondHand.style.transition = 'none';
        minuteHand.style.transition = 'none';
        hourHand.style.transition = 'none';
        setTimeout(() => {
            hourHand.style.transition = 'transform .5s cubic-bezier(0, 2.31, 1, 0.74)';
            minuteHand.style.transition = 'transform .5s cubic-bezier(0, 2.31, 1, 0.74)';
            secondHand.style.transition = 'transform .5s cubic-bezier(0, 2.31, 1, 0.74)';
        }, 20)
    }

    const hoursString = hours < 10 ? `0${hours}` : hours;
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;

    const timeFormat = `${hoursString} : ${minutesString} : ${secondsString}`;
    time.textContent = timeFormat;

    if (hours > 6 && hours < 18) {
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
        if (hours <= 0) {
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

function radius(shape) {
    if (shape === 'circle') {
        if (clockFace.style.borderRadius === '10px') {
            clockFace.style.borderRadius = '50%';
            clockFace.style.transition = 'all 1s';
        } else {
            clockFace.style.borderRadius = '10px';
            clockFace.style.transition = 'all 1s'
        }
    } else {
        clockFace.style.borderRadius = '50%';
        clockFace.style.transition = 'all 1s'
    }
}

function hideClock(clockVisible) {
    if (clockVisible === 'true') {
        if (clock.style.visibility === 'hidden') {
            clock.style.visibility = 'visible';
            clock.style.transition = 'all .5s';
            hand.style.transition = 'all 1s'
        } else if (clock.style.visibility === 'visible') {
            clock.style.visibility = 'hidden';
            clock.style.transition = 'all .5s';
            hand.style.transition = 'all 1s'
        }
    } else {
        clock.style.visibility = 'hidden'
        clock.style.transition = 'all .5s';
        hand.style.transition = 'all 1s'
    }
}

function changeFont(fontStyle) {
    if (fontStyle === 'tiny5') {
        body.style.fontFamily = 'Tiny5, sans-serif';
    } else if (fontStyle === 'roboto') {
        body.style.fontFamily = 'Roboto, sans-serif';
    }
}

setInterval(typeWrite(), typeWriteTime);
setInterval(() => setTime(mode), interval);
setInterval(() => setDate(mode), interval);
setInterval(() => blink(btn), blinkInterval);