const checkForSingleDigit = (timeUnit) => {
    timeUnit < 10 
        ? timeUnit = "0" + timeUnit
        : timeUnit = timeUnit.toString();
    return timeUnit;
};

const getTimestamp = () => {
    // Get current date in format YYYY-MM-DD HH:MM:SS
    // to fit SQLite as a date of type TEXT
    let today = new Date();

    const year = today.getFullYear();
    let month = checkForSingleDigit(today.getMonth() + 1);
    let day = checkForSingleDigit(today.getDate());

    let hour = checkForSingleDigit(today.getHours());
    let minutes = checkForSingleDigit(today.getMinutes());
    let seconds = checkForSingleDigit(today.getSeconds());

    const timestamp = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    return timestamp;
}

// Returns a random number between min (included) and max (not included) with the desired no. of floating decimals
const getRandomRealNumber = (min, max, desiredDecimals) => {
    let longDigitsVal = Math.random() * (max - min) + min;
    return Number(longDigitsVal.toFixed(desiredDecimals));
}

const prependIntoTable = measurement => {
    let measurementsTable = document.getElementById('measurements-table-body');
    let newTableRow = document.createElement('tr');

    newTableRow.innerHTML =
        `
        <td>${measurement.id}</td>
        <td>${measurement.timestamp}</td>
        <td>${measurement.ph_value}</td>
        <td>${measurement.temperature_celsius}</td>
        <td>${measurement.electric_conductivity}</td>
        `;

    // measurementsTable.appendChild(newTableRow);
    measurementsTable.insertBefore(newTableRow, measurementsTable.childNodes[0]);
}

const announce = text => {
    const announcement = document.getElementById("request-measurement-message");
    announcement.textContent = text;
    announcement.style.display = 'inline';
    setTimeout(() => {
        announcement.textContent = '';
        announcement.style.display = 'none';
    }, 5000);    
};

const generateMeasurementData = () => {
    let measurementObj = {};

    const timestamp = getTimestamp();

    //Get a random ph value between 6 and 7
    const phValue = getRandomRealNumber(6, 8, 1);

    //Get a random Celsius temperature between 12 and 19
    const temperatureCelsius = getRandomRealNumber(12, 20, 2);

    //Get a random EC value between 0.005 and 0.05
    const electricConductivity = getRandomRealNumber(0.005, 0.051, 3);

    measurementObj = {
        timestamp: timestamp,
        phValue: phValue,
        temperatureCelsius: temperatureCelsius,
        electricConductivity: electricConductivity
    }

    return measurementObj;
}