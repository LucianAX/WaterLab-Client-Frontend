const btn = document.getElementById('request-measurement-button');

btn.addEventListener('click', () => {
    document.location.reload(true);
    sendPostRequest();
});

/*** Helper functions ***/

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

const generateAnnouncement = (text) => {
    const announcement = document.getElementById("request-measurement-message");
    announcement.textContent = text;
    announcement.style.display = 'inline';
    setTimeout(() => {
        announcement.textContent = '';
        announcement.style.display = 'none';
    }, 5000);    
};


/*** Creating measurement and sending it as request ***/

const timestamp = getTimestamp();

//Get a random ph value between 6 and 7
const phValue = getRandomRealNumber(6, 8, 1);

//Get a random Celsius temperature between 12 and 19
const temperatureCelsius = getRandomRealNumber(12, 20, 2);

//Get a random EC value between 0.005 and 0.05
const electricConductivity = getRandomRealNumber(0.005, 0.051, 3);



// Request measurement using async-await fetch
async function sendPostRequest() {
    try {
        const url = 'http://localhost:4000/api/measurements';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'measurement': {
                    timestamp: timestamp,
                    phValue: phValue,
                    tempC: temperatureCelsius,
                    elecCond: electricConductivity,
                    stationaryUnitID: 1 
                }
            })
        });
        
        // handles response
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse.measurement);

            setTimeout(() => {
                generateAnnouncement('Measurement received! Check latest entry in the list!');
                prependIntoTable(jsonResponse.measurement);
            }, 1000);
            
        } else {
            throw new Error('Request failed!');
        }
    } catch (error) {
        console.log(error);
    }
}
