const btnRequestMeasurement = document.getElementById('request-measurement-button');

btnRequestMeasurement.addEventListener('click', () => {
    announce('Requesting new measurement...');
    
    //stub for generating measurement data
    const measurementData = generateMeasurementData();

    requestPostMeasurement(measurementData).then((measurement) => {
        //stub for receiving data from EMB via Back-end
        setTimeout(() => {            
            prependIntoTable(measurement);
            announce('Measurement received! Check latest entry in the list!');
        }, 2000);
    });
});

