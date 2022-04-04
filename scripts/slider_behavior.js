const slider = document.getElementById('decorator-table-data')
slider.addEventListener('click', () => check())

const check = () => {
    const measContainer = document.querySelector('.container-measurements')
    const warnContainer = document.querySelector('.container-warnings')
    const tableBody = document.querySelector('tbody')

    if (slider.checked) {
        // show warnings
        measContainer.style.display = 'none'
        warnContainer.style.display = 'block'
        tableBody.style.backgroundColor = 'red'
        console.log(tableBody.style.backgroundColor)
    } else {
        // show measurements
        console.log('unchecked')
        measContainer.style.display = 'block'
        warnContainer.style.display = 'none'
    }

}