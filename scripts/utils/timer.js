const totalSeconds = 
86400 * 3 + 3600 * 5 + 60 * 7 + 24;
// 86400 * 3 + 3600 * 5 + 60 * 7;
// 86400 * 3 + 3600 * 5;
// 86400 * 3;
// 0;

console.log(`totalSecodns is ${totalSeconds}`);

const convertSecondsToTimeUnits = inputSeconds => {
    const timeDivisors = [86400, 3600, 60];
    let timeQuotients = [];
    let dividend = inputSeconds;

    for (divisor of timeDivisors) {
        timeQuotients.push(Math.floor(dividend / divisor));
        dividend %= divisor;
    }

    timeQuotients.push(Math.floor(dividend));
    // timeQuotients.forEach(item => console.log(item));
    
    // test
    // timeQuotients.forEach(item => {
    //     let limitsEl = document.querySelector('#limits');
    //     let newEl = document.createElement('p');
    //     newEl.textContent = item;
    //     limitsEl.appendChild(newEl);
    //     console.log(newEl);
    // });

    return {
        days: timeQuotients[0],
        hours: timeQuotients[1],
        minutes: timeQuotients[2],
        seconds: timeQuotients[3]
    };
}

const unitsArr = convertSecondsToTimeUnits(totalSeconds);

const timeUnits = {
    days: unitsArr[0],
    hours: unitsArr[1],
    minutes: unitsArr[2],
    seconds: unitsArr[3]
}



const convertTimeUnitsToSeconds = unitsObject => {
    const { days, hours, minutes, seconds } = unitsObject;
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    console.log(totalSeconds);
    return totalSeconds;
}

convertTimeUnitsToSeconds(timeUnits);

const timerElapse = (inputSeconds) => {
    // --- Display all time units ---
    
    setInterval(() => {
        inputSeconds -= 1000;
        if (inputSeconds % 60 === 0) {
            const timeUnits = convertSecondsToTimeUnits(inputSeconds);
            // --- Display new units ---
        } else {
            // --- Display new number for seconds ---
        }
    }, 1000);
}