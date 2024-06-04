const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const timeDisplay = document.querySelector('.time');

function setDate() {
    const local = new Date();

    const hours = local.getHours();
    let hoursString = hours.toString();
    console.log('hours:', typeof (hoursString), hoursString); // Debugging Log
    const hoursDegrees = ((hours / 12) * 360) + 180;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    if (hours === 1 || hours === 2 || hours === 3 || hours === 4 || hours === 5 || hours === 6 || hours === 7 || hours === 8 || hours === 9) {
        hoursString = `0${hours}`;
        console.log('hour string replaced:', hoursString);
    }

    const minutes = local.getMinutes();
    let minutesString = minutes.toString();
    console.log('minutes:', typeof (minutesString), minutesString); // Debugging Log
    const minutesDegrees = ((minutes / 60) * 360) + 180;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    if (minutes === 1 || minutes === 2 || minutes === 3 || minutes === 4 || minutes === 5 || minutes === 6 || minutes === 7 || minutes === 8 || minutes === 9) {
        minutesString = `0${minutes}`;
        console.log('minute string replaced:', minutesString);
    }

    const seconds = local.getSeconds();
    let secondsString = seconds.toString();
    console.log('seconds:', typeof (secondsString), secondsString); // Debugging Log
    const secondsDegrees = ((seconds / 60) * 360) + 180;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    if (seconds === 0 || seconds === 1 || seconds === 2 || seconds === 3 || seconds === 4 || seconds === 5 || seconds === 6 || seconds === 7 || seconds === 8 || seconds === 9) {
        secondsString = `0${seconds}`;
        console.log('string replaced:', secondsString); // Debugging Log
    }

    if (secondsDegrees == 180 || minutesDegrees == 180 || hoursDegrees == 180) {
        secondHand.style.transition = "none";
        minuteHand.style.transition = "none";
        hourHand.style.transition = "none";
    } else {
        secondHand.style.transition = "";
        minuteHand.style.transition = "";
        hourHand.style.transition = "";
    }

    const time = hoursString + ' : ' + minutesString + ' : ' + secondsString;

    timeDisplay.textContent = `local time: ${time}`;
}
setInterval(setDate, 1000);

function blinkTime() {
    let timeVisibility = document.querySelector('.time');
    if (timeVisibility.style.visibility == 'hidden') {
        timeDisplay.style.visibility = 'visible';
    } else {
        timeDisplay.style.visibility = 'hidden';
    }
}
setInterval(blinkTime, 1000);