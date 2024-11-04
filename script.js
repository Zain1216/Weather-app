
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '5f7f3539dd0c226fbce685d7cd191f95';  
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`) 
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px'; 
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temparature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent === city) {
                return; 
            }

            cityHide.textContent = city;

            container.style.height = '555px'; 
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            // setTimeout(() => {
            //     container.classList.remove('active');
            // }, 500);

            
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow pic.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'mist.webp';
                    break;
                default:
                    image.src = 'cloud.png';
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>℃</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} Km/h`;

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            // setTimeout(() => {
            //     infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
            //     infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
            //     infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
            // }, 1500);

            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');

            if (cloneInfoWeather.length > 0) {
                const firstCloneWeather = cloneInfoWeather[0];
                const firstCloneHumidity = cloneInfoHumidity[0];
                const firstCloneWind = cloneInfoWind[0];

            //     setTimeout(() => {
            //         firstCloneWeather.remove();
            //         firstCloneHumidity.remove();
            //         firstCloneWind.remove();
            //     }, 500);
             }
        })
        .catch(() => {
            alert('Something went wrong. Please try again.'); 
        });
});