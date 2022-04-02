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
            console.log(jsonResponse.updatedInterval);
            return jsonResponse.updatedInterval;
        } else {
            console.log('Request failed!');
        }
    }
    catch (err) {
        console.log(err);
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
            console.log(jsonResponse.measurement);

            setTimeout(() => {
                generateAnnouncement('Measurement received! Check latest entry in the list!');
                prependIntoTable(jsonResponse.measurement);
            }, 1000);
            
        } else {
            throw new Error('Request failed!');
        }
    } catch (error) {
        console.log(error);
    }
}
