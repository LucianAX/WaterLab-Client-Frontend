const validateNewLimit = (
    currentInputType,
    currentInputValue,
    peerInputValue,
    childrenCollection
    ) => {
    let result = [true];
    let errMsg = "";

    if (currentInputType == 'max' &&
         currentInputValue <= peerInputValue) {
            errMsg = 'Error! Maximum value needs to be higher than minimum value!';
    } 
    else if (currentInputType == 'min' &&
                currentInputValue >= peerInputValue) {
            errMsg = 'Error! Minimum value needs to be lower than maximum value!';
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