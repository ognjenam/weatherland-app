const locationForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');





const updateUI = (data) => {
    const {cityInfo, cityWeather} = data;

    details.innerHTML = `
    <h5 class="my-3">${cityInfo.EnglishName}</h5>
    <div class="my-3">
        ${cityWeather.WeatherText}
    </div>
    <div class="display-4 my-4">
        <span>${cityWeather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    const iconSource = `assets/img/icons/${cityWeather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSource);

    let timeSource = cityWeather.IsDayTime ? 'assets/img/day.svg' : 'assets/img/night.svg';


    time.setAttribute('src', timeSource);



    if(card.classList.contains('d-none'))
    {
        card.classList.remove('d-none')
    };
     
}



const updateCity = async (city) => {
    const cityInfo = await getCity(city);
    const cityWeather = await getWeather(cityInfo.Key);

    return {
        cityInfo,
        cityWeather
    };
}




locationForm.addEventListener('submit', e => {

    e.preventDefault();


    const city = locationForm.city.value.trim();
    locationForm.reset();

    updateCity(city)
    .then(data => {
        updateUI(data);
    })
    .catch(err => {
        console.log(err)
    });

    localStorage.setItem('location', city);
});


if(localStorage.getItem('location'))
{
    updateCity(localStorage.getItem('location'))
    .then(data => {
        updateUI(data);
    })
    .catch(err => {
        console.log(err)
    });
}