/****  Limits area  ****/

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


/**** Timer Area ****/

const btnEditTimer = document.querySelector('.btn-edit-timer');
const btnAcceptTimer = document.querySelector('.btn-accept-timer');
const btnRejectTimer = document.querySelector('.btn-reject-timer')
const timeValuesArr = document.getElementsByClassName('time-value');
const initialStaticTimer = [];


const transitionEditingTimer = (edit, accept, reject, inputsReadOnly) => {
    btnEditTimer.style.display = edit;
    btnAcceptTimer.style.display = accept;
    btnRejectTimer.style.display = reject;
    for (var i = 0; i < 4; i++) {
        timeValuesArr[i].readOnly = inputsReadOnly;
    }
}

btnEditTimer.addEventListener('click', () => {    
    transitionEditingTimer('none', 'block', 'block', false);
    timeValuesArr[0].focus();

    //save initial timer values in case reject btn is clicked
    for (var i = 0; i < 4; i++) {
        initialStaticTimer.pop();
    }
    for (var i = 0; i < 4; i++) {
        initialStaticTimer.push(timeValuesArr[i].value);
    }
});

btnRejectTimer.addEventListener('click', () => {
    transitionEditingTimer('block', 'none', 'none', true);
    
    // revert the timer values back to initial state
    for (var i = 0; i < 4; i++) {
        timeValuesArr[i].value = initialStaticTimer[i];
    }
});

btnAcceptTimer.addEventListener('click', () => {
    const timeObject = extractTimeObject();
    
    const totalSeconds = convertTimeUnitsToSeconds(timeObject);
    requestUpdateStationaryUnitInterval(totalSeconds);
    insertTimerValues(totalSeconds, 'dynamic');
    
    transitionEditingTimer('block', 'none', 'none', true);
});


//Timer countdown logic

const isTimerActive = false;

const timerElapse = () => {
    // --- Display all time units ---
    const timeObject = extractTimeObject();
    let remainingSeconds = convertTimeUnitsToSeconds(timeObject);
    
    const intervalID = setInterval(() => {
        remainingSeconds--;
        if (remainingSeconds === -1) {
            clearInterval(intervalID);
            //request measurement
            console.log('Requesting measurement');
            sendPostRequest();
            
        } else if (remainingSeconds % 60 === 59) {
            insertTimerValues(remainingSeconds, 'dynamic');
        } else {
            //Display number for seconds that is smaller by one than previous
            timeValuesArr[7].value = Number(timeValuesArr[7].value) - 1;
        }
        
        
    }, 1000);
}

// if (isTimerActive) {
    timerElapse();
// }  






/**** Both Limits and Timer Area ****/

//feeding DB values into limits and timer
requestGetStationaryUnitData().then((stationaryUnitData) => {
    insertLimits(stationaryUnitData);
    insertTimerValues(stationaryUnitData.interval_execute_measurement, 'static');
    insertTimerValues(stationaryUnitData.interval_execute_measurement, 'dynamic');
});