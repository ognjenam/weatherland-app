const key = '3l8poZ7YEkCi721yFuYvEUKEDGIhgO4H'

//get weather information
const getWeather = async (locationId) => {
    const resource = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationId}?apikey=${key}`;

    const response = await fetch(resource + query);
    const data = await response.json();

    return data[0];

};


//get city information
const getCity = async (city) => {

    const resource = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(resource + query);
    const data = await response.json();
    return data[0];
};




