const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 180;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + 180;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + 180;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    if (secondsDegrees == 180|| minutesDegrees == 180|| hoursDegrees == 180) {
        secondHand.style.transition = "none";
        minuteHand.style.transition = "none";
        hourHand.style.transition = "none";
    } else {
        secondHand.style.transition = "";
        minuteHand.style.transition = "";
        hourHand.style.transition = "";
    }
}

setInterval(setDate, 1000);