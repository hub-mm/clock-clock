const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const time = document.querySelector('.time');
const local = new Date();

function setTime() {
    console.groupCollapsed('setTime');
    const local = new Date();
    console.groupCollapsed('time');
    const hours = local.getHours();
    let hoursString = hours.toString();
    console.log('hours:', typeof(hoursString), hoursString);
    const hoursDegrees = ((hours / 12) * 360) + 180;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    if (hours === 0 || hours === 1 || hours === 2 || hours === 3 || hours === 4 || hours === 5 || hours === 6 || hours === 7 || hours === 8 || hours === 9) {
        hoursString = `0${hours}`;
        console.log('hour string replaced:', hoursString);
    }
    
    const minutes = local.getMinutes();
    let minutesString = minutes.toString();
    console.log('minutes:', typeof(minutesString), minutesString);
    const minutesDegrees = ((minutes / 60) * 360) + 180;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    if (minutes === 1 || minutes === 2 || minutes === 3 || minutes === 4 || minutes === 5 || minutes === 6 || minutes === 7 || minutes === 8 || minutes === 9) {
        minutesString = `0${minutes}`;
        console.log('minute string replaced:', minutesString);
    }
    
    const seconds = local.getSeconds();
    let secondsString = seconds.toString();
    console.log('seconds:', typeof(secondsString), secondsString);
    const secondsDegrees = ((seconds / 60) * 360) + 180;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    if (seconds === 0 || seconds === 1 || seconds === 2 || seconds === 3 || seconds === 4 || seconds === 5 || seconds === 6 || seconds === 7 || seconds === 8 || seconds === 9) {
        secondsString = `0${seconds}`;
        console.log('string replaced:', secondsString);
    }
    console.groupEnd();

    console.groupCollapsed('Transition');
    if (secondsDegrees == 180 || minutesDegrees == 180 || hoursDegrees == 180) {
        secondHand.style.transition = "none";
        minuteHand.style.transition = "none";
        hourHand.style.transition = "none";
        console.log('transition did not take place');
    } else {
        secondHand.style.transition = "";
        minuteHand.style.transition = "";
        hourHand.style.transition = "";
        console.log('transition did take place');
    }
    console.groupEnd();
    
    console.groupCollapsed('timeFormat')
    const timeFormat = hoursString + ' : ' + minutesString + ' : ' + secondsString;
    time.textContent = `${timeFormat}`;
    console.log('time:', timeFormat);
    console.groupEnd();
}
setInterval(setTime, 1000);
console.groupEnd();


const date = document.querySelector('.date');
function setDate() {
    console.groupCollapsed('setDate');
    const local = new Date();
    const day = local.getDay();
    let dayString = day.toString();
    console.log('day:', typeof(dayString), dayString);
    if (day == 1 || day == 2 || day == 3 || day == 4 || day == 5 || day == 6 || day == 7 || day == 8 || day == 9) {
        dayString = `0${day}`;
        console.log('day string replaced:', dayString);
    }

    const month = local.getMonth();
    let monthString = month.toString();
    console.log('month', typeof(monthString), monthString);
    if (month == 1 || month == 2 || month == 3 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
        monthString = `0${month}`;
        console.log('month string replaced', monthString);
    }

    const year = local.getFullYear();
    console.log('year:', year);

    const dateFormat = dayString + ' / ' + monthString + ' / ' + year;
    date.textContent = `${dateFormat}`;
}
setInterval(setDate, 1000);
console.groupEnd();

function blinkTime() {
    let dateVisibility = document.querySelector('.date');
    if (dateVisibility.style.visibility == 'hidden') {
        date.style.visibility = 'visible';
    } else {
        date.style.visibility = 'hidden';
    }

    let timeVisibility = document.querySelector('.time');
    if (timeVisibility.style.visibility == 'hidden') {
        time.style.visibility = 'visible';
    } else {
        time.style.visibility = 'hidden';
    }
}
setInterval(blinkTime, 800);