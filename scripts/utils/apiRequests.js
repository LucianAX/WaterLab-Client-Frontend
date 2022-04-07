async function requestGetStationaryUnitData() {
    try {
        const url = 'http://localhost:4000/api/stationaryUnit/1';
        const response = await fetch(url, {
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

async function requestUpdateStationaryUnitInterval(timeInterval) {
    try {
        const url = 'http://localhost:4000/api/stationaryUnit/1';
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'measurementInterval': timeInterval
            })
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            // console.log(`Updated interval from DB: ${jsonResponse.updatedInterval}`);
            return jsonResponse.updatedStationaryUnit.interval_execute_measurement;
        }
        throw new Error('Request failed!');
        
    }
    catch (err) {
        console.log(err);
    }
}

async function requestUpdateStationaryUnitTimerStatus(status) {
    try {
        const url = 'http://localhost:4000/api/stationaryUnit/1';
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                'isTimerActive': status
             })
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.updatedStationaryUnit.is_timer_active;
        }
        throw new Error('Request failed!');
    }
    catch(error) {
        console.log(error);
    }
}

async function requestPostMeasurement({
        timestamp, phValue,
        temperatureCelsius, electricConductivity
    }) {
    try {
        const url = 'http://localhost:4000/api/measurements';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'measurement': {
                    timestamp: timestamp,
                    phValue: phValue,
                    tempC: temperatureCelsius,
                    elecCond: electricConductivity,
                    stationaryUnitID: 1 
                }
            })
        });
        
        // handles response
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.measurement;            
        } else {
            throw new Error('Request failed!');
        }
    } catch (error) {
        console.log(error);
    }
}
