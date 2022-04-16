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
    currentInputType,
    currentInputValue,
    peerInputValue,
    childrenCollection
    ) => {
    //assume new limit is valid
    let result = [true];
    let errMsg = "";

    //check against no input
    if (!currentInputValue) {
        errMsg = 'Error! You must insert a value!';
    } else {
        currentInputValue = Number(currentInputValue);
        peerInputValue = Number(peerInputValue);

        //check against peer input value and absolute value
        if (currentInputType == 'max') {
            if (currentInputValue <= peerInputValue) {
                errMsg = 'Error! Maximum value needs to be higher than minimum value!';
            } 
            // else if () {

            // }
        }
        else if (currentInputType == 'min') {
            if (currentInputValue >= peerInputValue) {
                errMsg = 'Error! Minimum value needs to be lower than maximum value!';
            }
            // else if {

            // }
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
