const btnRequestMeasurement = document.getElementById('request-measurement-button');

btnRequestMeasurement.addEventListener('click', () => {
    // document.location.reload(true);

    const measurementData = generateMeasurementData();
    requestPostMeasurement(measurementData);
});

