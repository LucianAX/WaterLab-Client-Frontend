async function getStationaryUnitData() {
    try {
        const response = await fetch('http://localhost:4000/api/stationaryUnit/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.stationaryUnit;
        } else {
            console.log('Request failed!');
        }
    }
    catch (err) {
        console.log(err);
    }
}

const insertLimits = data => {
    const phMin = document.getElementById("pH-min");
    const phMax = document.getElementById("pH-max");
    const tempMin = document.getElementById("temp-min");
    const tempMax = document.getElementById("temp-max");
    const ecMin = document.getElementById("ec-min");
    const ecMax = document.getElementById("ec-max");

    phMin.textContent = data.limit_ph_minimum;
    phMax.textContent = data.limit_ph_maximum;
    tempMin.textContent = data.limit_temp_minimum;
    tempMax.textContent = data.limit_temp_maximum;
    ecMin.textContent = data.limit_ec_minimum;
    ecMax.textContent = data.limit_ec_maximum;
}

const insertStaticTimerValues = data => {
    const timeValuesArr = document.getElementsByClassName('time-value');
    
    const totalSeconds = data.interval_execute_measurement;
    const timeUnits = convertSecondsToTimeUnits(totalSeconds);

    timeValuesArr[0].value = timeUnits.days;
    timeValuesArr[1].value = timeUnits.hours;
    timeValuesArr[2].value = timeUnits.minutes;
    timeValuesArr[3].value = timeUnits.seconds;
}



getStationaryUnitData().then((stationaryUnitData) => {
    insertLimits(stationaryUnitData);
    insertStaticTimerValues(stationaryUnitData);
});


const btnEditTimer = document.querySelector('.btn-edit-timer');
const btnAcceptTimer = document.querySelector('.btn-accept-timer');
const btnRejectTimer = document.querySelector('.btn-reject-timer')

btnEditTimer.addEventListener('click', () => {
    const timeValuesArr = document.getElementsByClassName('time-value');
    for(var i = 0; i < 4; i++) {
        timeValuesArr[i].readOnly = false;
    }
    timeValuesArr[0].focus();
    // document.getElementById('container-timedata-with-edit').style.fontSize = '1.5rem';
    
    btnEditTimer.style.display = 'none';
    btnAcceptTimer.style.display = 'block';
    btnRejectTimer.style.display = 'block';
});

btnAcceptTimer.addEventListener('click', () => {
    
});