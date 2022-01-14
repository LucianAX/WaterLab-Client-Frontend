const slider = document.getElementById('decorator')
slider.checked = false;
slider.addEventListener('click', () => check())

const check = () => {
    const measContainer = document.querySelector('.container-measurements')
    const warnContainer = document.querySelector('.container-warnings')
    const tableRow = document.querySelector('tbody')

    if (slider.checked) {
        // show warnings
        console.log('checked')
        measContainer.style.display = 'none'
        warnContainer.style.display = 'block'
        tableBody.style.backgroundColor = 'red'
        // '#EB8A8C'
        console.log(tableBody.style.backgroundColor)
    } else {
        // show measurements
        console.log('unchecked')
        measContainer.style.display = 'block'
        warnContainer.style.display = 'none'
        // #66C4FF;

    }

}