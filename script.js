function apiWeather(){

    event.preventDefault();

    let location = document.getElementById('city').value.toLowerCase();
    let city = location[0].toUpperCase() + location.slice(1);
    const weatherTranslations = {
        'Clear': 'Despejado',
        'Clouds': 'Nublado',
        'Rain': 'Lluvioso',
        'Drizzle': 'Llovizna',
        'Thunderstorm': 'Tormenta',
        'Snow': 'Nieve',
        'Mist': 'Neblina',
        };


    const urlLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=80e4e613161854fade9dde28ce72f768`;

    fetch(urlLocation)
            .then (response => {
                if(!response.ok){
                    throw new Error ('Error en la geolocalizacion');
                }
                return response.json()})
            .then (data => {
                if(data.length == 0) {
                    throw new Error ('No se encontró la ciudad');
                }
                const lat = data[0].lat;
                const lon = data[0].lon;
                const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=80e4e613161854fade9dde28ce72f768`;

                return fetch(urlWeather)
                        .then (response => {
                            if(!response.ok){
                                throw new Error('Error en la api del tiempo')
                            }
                            return response.json();})
                        .then (data => {
                            let mainWeather = data.weather[0].main;
                            let mainWeatherES = weatherTranslations[mainWeather] || mainWeather;
                            document.getElementById('main').textContent = 'Tiempo: ' + mainWeatherES;
                            document.getElementById('temp').textContent = 'Temperatura actual: ' + Math.floor(data.main.temp - 273) + '°C';
                            document.getElementById('clouds').textContent = 'Hoy está un ' + data.clouds.all + '% nublado';
                            if(typeof data.rain == 'undefined' || typeof data.rain['1h'] == 'undefined'){
                                document.getElementById('rain').textContent = 'La predicción de lluvia no está disponible en esta zona'
                            } else {
                                document.getElementById('rain').textContent = 'Las precipitaciones están: ' + data.rain['1h'] + ' mm/h';
                            }
                }) .catch(error => console.log(error));
            })
        }

function backgroundColor(){
    let today = new Date();

    if(today.getHours() < 8 || today.getHours() >= 21){
        document.body.style.background = 'linear-gradient(0deg,rgb(64, 76, 241),rgb(0, 0, 0))';
    } else if (today.getHours() >= 18 && today.getHours() < 21){
        document.body.style.background = 'linear-gradient(0deg,rgb(160, 234, 247),rgb(255, 146, 57))';
    }
}

function backgroundImg(){
    let img = document.getElementById('imgTiempo');
    let tiempo = document.getElementById('main').value;
    let hora = new Date();

    img.setAttribute('src', 'img/arcoiris.png');

    if(today.getHours() < 8 || today.getHours() >= 21){
    switch(tiempo){
        case 'Nublado': img.setAttribute('src', 'img/nublado.png');
        break;
        case '':
    }
} else if (today.getHours() >= 18 && today.getHours() < 21){
    switch(tiempo){
        case 'Nublado': img.setAttribute('src', 'img/nublado.png');
        break;
        case '':
    }
}
}