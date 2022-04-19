const identifyLimitBtn = (btnType, btnName) => {
    const btnCollEditLimit = document.getElementsByClassName('btn-limit-edit');
    const btnCollAcceptLimit = document.getElementsByClassName('btn-limit-accept');
    const btnCollRejectLimit = document.getElementsByClassName('btn-limit-reject');
    let btnsCollection;

    switch(btnType) {
        case 'edit':
            btnsCollection = btnCollEditLimit;
            break;       
        case 'accept':
            btnsCollection = btnCollAcceptLimit;
            break; 
        case 'reject':
            btnsCollection = btnCollRejectLimit;
            break;
        default:
            break;
    }
    
    return Object.values(btnsCollection).find(btn => btn.name === btnName);
}

const transitionLimitBtns = (currentBtnName) => {
        const btnEdit = identifyLimitBtn('edit', currentBtnName);
        const btnAccept = identifyLimitBtn('accept', currentBtnName);
        const btnReject = identifyLimitBtn('reject', currentBtnName);

        btnEdit.style.display = (btnEdit.style.display === 'block' || !btnEdit.style.display) ? 'none' : 'block';
        btnAccept.style.display = btnAccept.style.display === 'block' ? 'none' : 'block';
        btnReject.style.display = btnReject.style.display === 'block' ? 'none' : 'block';
}

const matchLimitType = markupName => {
    switch (markupName) {
        case 'ph-min':
            return 'limit_ph_minimum';
        case 'ph-max':
            return 'limit_ph_maximum';
        case 'temp-min':
            return 'limit_temp_minimum';
        case 'temp-max':
            return 'limit_temp_maximum';
        case 'ec-min':
            return 'limit_ec_minimum';
        case 'ec-max':
            return 'limit_ec_maximum';
        default: 
            throw new Error('Error! Markup limit type name does not match database name!');
            break;
    }
}

const validateNewLimit = (
        currentInputType, currentInputValue,
        peerInputValue, childrenCollection
    ) => {
    //assume new limit is valid
    let result = [true];
    let errMsg = "";
    
    //thresholds for possible parameter values
    const phMinThreshold = 6.0;
    const phMaxThreshold = 8.0;
    const tempMinThreshold = 7.00;
    const tempMaxThreshold = 15.00;
    const ecMinThreshold = 0.005;
    const ecMaxThreshold = 0.05;

    //check against no input
    if (!currentInputValue) {
        errMsg = 'Error! You must insert a value!';
    } else {
        currentInputValue = Number(currentInputValue);
        peerInputValue = Number(peerInputValue);

        //check against peer input value and absolute value thresholds
        if (currentInputType[1] == 'max') {
            if (currentInputValue <= peerInputValue) {
                errMsg = 'Error! Maximum value needs to be higher than minimum value!';
            } 
            else if ( currentInputType[0] == 'ph' && currentInputValue > phMaxThreshold
                    || currentInputType[0] == 'temp' && currentInputValue > tempMaxThreshold
                    || currentInputType[0] == 'ec' && currentInputValue > ecMaxThreshold ) {
                errMsg = 'Error! You have inserted a maximum value beyond the permitted threshold!';
            }
        }
        else if (currentInputType[1] == 'min') {
            if (currentInputValue >= peerInputValue) {
                errMsg = 'Error! Minimum value needs to be lower than maximum value!';
            }
            else if ( currentInputType[0] == 'ph' && currentInputValue < phMinThreshold
                    || currentInputType[0] == 'temp' && currentInputValue < tempMinThreshold
                    || currentInputType[0] == 'ec' && currentInputValue < ecMinThreshold ) {
                errMsg =  'Error! You have inserted a minimum value below the permitted threshold!';                      
            }
        }
    }

    if (errMsg) {
        result[0] = false;
        result.push(errMsg);

        //find corresponding reject btn and call its delegated listener
        for (let child of childrenCollection) {
            if (child.classList.contains('btn-limit-reject')) {
                result.push(child);
            }
        }
    }
    return result;
}
