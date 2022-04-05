// 86400 * 3 + 3600 * 5 + 60 * 7 + 24;
// 86400 * 3 + 3600 * 5 + 60 * 7;
// 86400 * 3 + 3600 * 5;
// 86400 * 3;
// 0;

const extractTimeObject = () => {
    const timeValuesArr = document.getElementsByClassName('time-value');
    const timeObject = {
        days: Number(timeValuesArr[0].value),
        hours: Number(timeValuesArr[1].value),
        minutes: Number(timeValuesArr[2].value),
        seconds: Number(timeValuesArr[3].value)
    };
    return timeObject;
}

const convertSecondsToTimeUnits = inputSeconds => {
    const timeDivisors = [86400, 3600, 60];
    let timeQuotients = [];
    let dividend = inputSeconds;

    for (divisor of timeDivisors) {
        timeQuotients.push(Math.floor(dividend / divisor));
        dividend %= divisor;
    }

    timeQuotients.push(Math.floor(dividend));

    return {
        days: timeQuotients[0],
        hours: timeQuotients[1],
        minutes: timeQuotients[2],
        seconds: timeQuotients[3]
    };
}

const convertTimeUnitsToSeconds = unitsObject => {
    const { days, hours, minutes, seconds } = unitsObject;
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
}

const insertTimerValues = (totalSeconds, timerType) => {
    const timeUnits = convertSecondsToTimeUnits(totalSeconds);

    if (timerType === 'static') {
        timeValuesArr[0].value = timeUnits.days;
        timeValuesArr[1].value = timeUnits.hours;
        timeValuesArr[2].value = timeUnits.minutes;
        timeValuesArr[3].value = timeUnits.seconds;
    } else if (timerType === 'dynamic') {
        timeValuesArr[4].value = timeUnits.days;
        timeValuesArr[5].value = timeUnits.hours;
        timeValuesArr[6].value = timeUnits.minutes;
        timeValuesArr[7].value = timeUnits.seconds;
    } else {
        throw new Error('Timer type non-existent');
    }
}

const validateTimerUserInput = timeObject => {
    const { days, hours, minutes, seconds } = timeObject;
    let result = [true]; //assume no error
    let errorMsg = ''; 

    if (days < 0 || days > 365) errorMsg += 'Days input was out of range!\n';
    if (hours < 0 || hours > 23) errorMsg += 'Hours input was out of range!\n';
    if (minutes < 0 || minutes > 59) errorMsg += 'Minutes input was out of range!\n';
    if (seconds < 0 || seconds > 59) errorMsg += 'Seconds input was out of range!\n';
    
    if (errorMsg) {
        result.pop();
        result.push(false);
        result.push(errorMsg);
    }
    
    return result;
}