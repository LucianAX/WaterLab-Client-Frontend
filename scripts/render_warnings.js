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

requestGetWarnings().then(warnings => {
    warnings.forEach(warning => insertWarningIntoTable(warning));
});