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
    insertTimerValues(remainingSeconds, 'dynamic');
    
    intervalID = setInterval(() => {
        if (isTimerActive) {
            remainingSeconds--;
            // Display number for seconds that is smaller by one than previous
            timeValuesArr[7].value = Number(timeValuesArr[7].value) - 1;

            if (remainingSeconds === 0) {
                clearInterval(intervalID);
                
                //generate measurement data and send POST request
                btnRequestMeasurement.click();     
                
                // setTimeout(() => {
                    timerElapse();
                // }, 5000);
            } else if (remainingSeconds % 60 === 59) {
                insertTimerValues(remainingSeconds, 'dynamic');
            } 
        } else {
            clearInterval(intervalID);
        }
        
        
    }, 1000);
}


/****  Limits area  ****/

const btnCollEditLimit = document.getElementsByClassName('btn-limit-edit');
const btnCollAcceptLimit = document.getElementsByClassName('btn-limit-accept');
const btnCollRejectLimit = document.getElementsByClassName('btn-limit-reject');
let initialLimits = {}; //for saving initial limits before any changes


const insertLimits = data => {
    const phMin = document.getElementById("ph-min");
    const phMax = document.getElementById("ph-max");
    const tempMin = document.getElementById("temp-min");
    const tempMax = document.getElementById("temp-max");
    const ecMin = document.getElementById("ec-min");
    const ecMax = document.getElementById("ec-max");

    phMin.value = data.limit_ph_minimum;
    phMax.value = data.limit_ph_maximum;
    tempMin.value = data.limit_temp_minimum;
    tempMax.value = data.limit_temp_maximum;
    ecMin.value = data.limit_ec_minimum;
    ecMax.value = data.limit_ec_maximum;
}

const saveInitialLimits = () => {
    let limitValuesColl = document. getElementsByClassName('limit-value');
    for (limitEl of limitValuesColl) {
        initialLimits[limitEl.id] = limitEl.value;
    }
}


// const blabla_transitionEditingTimer = (edit, accept, reject, inputsReadOnly) => {
//     btnEditTimer.style.display = edit;
//     btnAcceptTimer.style.display = accept;
//     btnRejectTimer.style.display = reject;
//     for (var i = 0; i < 4; i++) {
//         timeValuesArr[i].readOnly = inputsReadOnly;
//     }
// }

// const transitionInput = (edit, accept, reject, inputsReadOnly) => {

// }

const btnLimitEditListener = event => {
    //make edit btn disappear, corresponding accept and reject btns appear and input element editable
    const btnEditName = event.target.name;
    const inputEl = document.getElementById(btnEditName);

    const btnAccept = Object.values(btnCollAcceptLimit).find(btnAccept => btnAccept.name === btnEditName);
    const btnReject = Object.values(btnCollRejectLimit).find(btnReject => btnReject.name === btnEditName);

    event.target.style.display = 'none';
    btnAccept.style.display = 'block';
    btnReject.style.display = 'block';       
    inputEl.readOnly = false;
}

const btnLimitRejectListener = event => {
    const btnRejectName = event.target.name;
    const inputEl = document.getElementById(btnRejectName);

    const btnEdit = Object.values(btnCollEditLimit).find(btnEdit => btnEdit.name === btnRejectName);
    const btnAccept = Object.values(btnCollAcceptLimit).find(btnAccept => btnAccept.name === btnRejectName);
    
    inputEl.value = initialLimits[btnRejectName];

    event.target.style.display = 'none';
    btnAccept.style.display = 'none';
    btnEdit.style.display = 'block';
    inputEl.readOnly = true;
}

const btnLimitAcceptListener = event => {
    const btnAcceptName = event.target.name;
    const inputEl = document.getElementById(btnAcceptName);

    const btnEdit = Object.values(btnCollEditLimit).find(btnEdit => btnEdit.name === btnAcceptName);
    const btnReject = Object.values(btnCollRejectLimit).find(btnReject => btnReject.name === btnAcceptName);

    //use name attribute to fetch peer input limit value
    const nameArr = btnAcceptName.split('-');
    let peerInputName = nameArr[0] + '-';
    peerInputName += nameArr[1] == 'max' ? 'min' : 'max'; 
    let peerInputEl = document.getElementById(peerInputName);

    const validationResult = validateNewLimit(
        nameArr[1],
        inputEl.value,
        peerInputEl.value,
        event.target.parentElement.children    
    );  //positive: [true]
        //negative: [false, errMsg, child]
    
    if (!validationResult[0]) {
        alert(validationResult[1]);
        validationResult[2].click();
    } else {
        //get type of limit as named in DB
        const limitType = matchLimitType(btnAcceptName);
        
        //send PUT
        requestUpdateStationaryUnitLimit(limitType, inputEl.value)
            .then(updatedStationaryUnit => {
                console.log(updatedStationaryUnit);

                inputEl.value = updatedStationaryUnit[limitType];
                initialLimits[btnAcceptName] = updatedStationaryUnit[limitType];
                
                event.target.style.display = 'none';
                btnReject.style.display = 'none';
                btnEdit.style.display = 'block';
                inputEl.readOnly = true;
            });
    }
}

{
    //add click event listener for all containers with limit values
    const collContainerLimits = document.querySelectorAll('.container-limit-values');
    const handleLimitBtnClick = event => {
        if (event.target.classList.contains('btn-limit-edit')) {
            btnLimitEditListener(event);
        } else if (event.target.classList.contains('btn-limit-reject')) {
            btnLimitRejectListener(event);
        } else if (event.target.classList.contains('btn-limit-accept')) {
            btnLimitAcceptListener(event);
        }
    }
    
    for (container of collContainerLimits) {
        container.addEventListener('click', handleLimitBtnClick);
    }
}

/**** Both Limits and Timer Area ****/

//feeding DB values into limits and timer
requestGetStationaryUnitData().then((stationaryUnitData) => {
    insertLimits(stationaryUnitData);
    saveInitialLimits();
    insertTimerValues(stationaryUnitData.interval_execute_measurement, 'static');
    insertTimerValues(stationaryUnitData.interval_execute_measurement, 'dynamic');
    
    //initialize Timer status
    sliderTimer.checked = !stationaryUnitData.is_timer_active; //NOTE: timer checked value corresponds to logic false (it is reverted - check slider in CSS)
    isTimerActive = stationaryUnitData.is_timer_active === 1 ? true : false;
    if (isTimerActive) {
        timerElapse()
    }
});