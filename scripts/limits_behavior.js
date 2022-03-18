const insertLimits = data => {
    const phMin = document.getElementById("pH-min");
    const phMax = document.getElementById("pH-max");
    const tempMin = document.getElementById("temp-min");
    const tempMax = document.getElementById("temp-max");
    const ecMin = document.getElementById("ec-min");
    const ecMax = document.getElementById("ec-max");

    phMin.textContent = data.limit_ph_minimum;
    phMax.textContent = data.limit_ph_maximum;
    tempMin.textContent = data.limit_temp_minimum;
    tempMax.textContent = data.limit_temp_maximum;
    ecMin.textContent = data.limit_ec_minimum;
    ecMax.textContent = data.limit_ec_maximum;

}

async function getLimits() {
    try {
        const response = await fetch('http://localhost:4000/api/stationaryUnit/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            // console.log(jsonResponse);
            insertLimits(jsonResponse.stationaryUnit);
        } else {
            console.log('Request failed!');
        }
    }
    catch (err) {
        console.log(err);
    }
}

// async function getLimits() {
//     try {
//         const response = await fetch('http://localhost:4000/api/stationaryUnit', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.ok) {
//             const jsonResponse = await response.json();
//             console.log(jsonResponse);
//             // insertLimits(jsonResponse.stationaryUnit);
//         } else {
//             console.log('Request failed!');
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

getLimits();