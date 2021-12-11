let insertIntoTable = measurement => {
    let measurementsTable = document.getElementById('measurements-table-body');
    let newTableRow = document.createElement('tr');
    
    newTableRow.innerHTML =
        `
        <td>${measurement.id}</td>
        <td>${measurement.timestamp}</td>
        <td>${measurement.ph_value}</td>
        <td>${measurement.temperature_celsius}</td>
        <td>${measurement.electric_conductivity}</td>
        `;

    measurementsTable.appendChild(newTableRow);
}

async function renderMeasurements() {
    
    try {
        //sends request
        const response = await fetch('http://localhost:4000/api/measurements', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //handles response if successful
        if (response.ok) {
            const jsonResponse = await response.json();
            
            //Code to execute with jsonResponse
            jsonResponse.measurements.forEach(measurement => insertIntoTable(measurement) );
        }
    } 
    //handles response if unsuccessful
    catch (error) {
        console.log(error);
    }
}

renderMeasurements();



