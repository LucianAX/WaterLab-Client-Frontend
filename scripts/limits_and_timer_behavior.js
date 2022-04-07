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
const timeValuesArr = document.getElementsByClassName('time-value'); //stores all 8 time values from both static and dynamic timers
const initialStaticTimer = []; //stores initial static timer values before accepting changes  so it can be used in case of change rejection
const sliderTimer = document.getElementsByClassName('decorator-slider-timer')[0];
let isTimerActive;
let intervalID; // ID of setInterval() that does the countdown


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
    const validation = validateTimerUserInput(timeObject);
    
    if (validation[0]) {
        const totalSeconds = convertTimeUnitsToSeconds(timeObject);
        
        requestUpdateStationaryUnitInterval(totalSeconds);
        insertTimerValues(totalSeconds, 'dynamic');
        transitionEditingTimer('block', 'none', 'none', true);
    
        if (intervalID) clearInterval (intervalID);
        isTimerActive = false; //deactivates previous ongoing timer (if it was active)
        sliderTimer.checked = true; //deactivate timer
        
    } else {
        alert(validation[1]);
        btnRejectTimer.click();
    }  
});

//Timer slider
sliderTimer.addEventListener('click', (event) => {
    isTimerActive = !event.target.checked; //NOTE: timer checked value corresponds to logic false (it is reverted - check slider in CSS)
    requestUpdateStationaryUnitTimerStatus(isTimerActive);
    
    //call timerElapse if the timer is enabled, else clear the old one if existing
    if (isTimerActive) {
        timerElapse();
    } else {
        //reset Interval on disable action
        clearInterval(intervalID);
        for (var i = 0; i < 4; i++) {
            timeValuesArr[i + 4].value = timeValuesArr[i].value;
        }
    }
});


//Timer countdown logic
const timerElapse = () => {
    // --- Display all time units ---
    const timeObject = extractTimeObject();
    let remainingSeconds = convertTimeUnitsToSeconds(timeObject);
    
    intervalID = setInterval(() => {
        if (isTimerActive) {
            remainingSeconds--;
            // Display number for seconds that is smaller by one than previous
            timeValuesArr[7].value = Number(timeValuesArr[7].value) - 1;

            if (remainingSeconds === 0) {
                clearInterval(intervalID);
                
                //request measurement
                console.log('Requesting measurement');
                const measurementData = generateMeasurementData();
                requestPostMeasurement(measurementData);
                
            } else if (remainingSeconds % 60 === 59) {
                insertTimerValues(remainingSeconds, 'dynamic');
            } else {
                //Display number for seconds that is smaller by one than previous
                // timeValuesArr[7].value = Number(timeValuesArr[7].value) - 1;
            }
        } else {
            clearInterval(intervalID);
        }
        
        
    }, 1000);
}



/**** Both Limits and Timer Area ****/

//feeding DB values into limits and timer
requestGetStationaryUnitData().then((stationaryUnitData) => {
    insertLimits(stationaryUnitData);
    insertTimerValues(stationaryUnitData.interval_execute_measurement, 'static');
    insertTimerValues(stationaryUnitData.interval_execute_measurement, 'dynamic');
    
    //initialize Timer status
    sliderTimer.checked = !stationaryUnitData.is_timer_active; //NOTE: timer checked value corresponds to logic false (it is reverted - check slider in CSS)
    isTimerActive = stationaryUnitData.is_timer_active === 1 ? true : false;
    if (isTimerActive) {
        timerElapse()
    }
});