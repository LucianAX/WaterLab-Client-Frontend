let insertWarningIntoTable = warning => {
    let measurementsTable = document.getElementById('warnings-table-body')
    let newTableRow = document.createElement('tr')
    newTableRow.classList.add('has-warning')
    
    newTableRow.innerHTML =
        `
        <td>${warning.id}</td>
        <td>${warning.measurement_id}</td>
        <td>${warning.timestamp}</td>
        <td>${warning.ph_value}</td>
        <td>${warning.temperature_celsius}</td>
        <td>${warning.electric_conductivity}</td>
        `;

    measurementsTable.appendChild(newTableRow)
}

async function renderWarnings() {
    
    try {
        //sends request
        const response = await fetch('http://localhost:4000/api/warnings', {
            method: 'GET',
            headers: {
                'Content_Type': 'application/json'
            }
        })

        //handles response if successful
        if (response.ok) {
            const jsonResponse = await response.json()

            //Code to execute with jsonResponse
            jsonResponse.warnings.forEach(warning => insertWarningIntoTable(warning) )
        }
    }
    //handles response if unsuccessful
    catch (error) {
        console.log(error)
    }
}

renderWarnings()