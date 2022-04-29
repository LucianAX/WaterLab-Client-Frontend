const btnRequestMeasurement = document.getElementById('request-measurement-button');

btnRequestMeasurement.addEventListener('click', () => {
    announce('Requesting new measurement...');
    
    //stub for generating measurement data
    const measurementData = generateMeasurementData();
    
    // measurementData.phValue = 7.0;
    // measurementData.temperatureCelsius = 11.4;
    // measurementData.electricConductivity = 0.043;

    requestPostMeasurement(measurementData).then((measurement) => {
        //stub for receiving data from EMB via Back-end
        setTimeout(() => {            
            prependMeasurementIntoTable(measurement);
            announce('Measurement received! Check latest entry in the list!');

            // console.log(`Does it have warning? ${measurement.has_warning }`);
            // console.log(`CHecking measurement: ${measurement.ph_value}`);

            if (measurement.has_warning) {
                console.log(`entered!!!`)
                requestGetWarnings().then(warnings => {
                    warnings.forEach(warning => insertWarningIntoTable(warning));
                });
            }
        }, 2000);
    });
});

