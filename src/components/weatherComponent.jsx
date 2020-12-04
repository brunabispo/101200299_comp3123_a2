import React, { useState } from 'react';
import axios from 'axios';
import { render } from 'react-dom';

const Weather = () => {

    const [temperature, setTemperature] = useState('');
    const [city, setCity] = useState('Toronto');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [tempMin, setTempMin] = useState('');
    const [tempMax, setTempMax] = useState('');
    const [pressure, setPressure] = useState('');
    const [humidity, setHumidity] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [icon, setIcon] = useState();


    const getWeather = (city) => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=650c71eae5dbb618438c738675e829a5`)
        .then( res => {
            console.log(res.data.main.temp);
            // get the temp and convert from Kelvin to Celsius
            setTemperature(res.data.main.temp - 273.15);

            // get the temp and convert from Kelvin to Fahrenheit
            // setTemperature((res.data.main.temp - 273.15) * 1.8 + 32);

            setDescription(res.data.weather[0].main);
            setName(res.data.name);
            setCountry(res.data.sys.country);
            setFeelsLike(res.data.main.feels_like - 273.15);
            setTempMin(res.data.main.temp_min - 273.15);
            setTempMax(res.data.main.temp_max - 273.15);
            setPressure(res.data.main.pressure);
            setHumidity(res.data.main.humidity);
            setWindSpeed(res.data.wind.speed);
            setDate(res.data.dt);
            setIcon(res.data.weather[0].icon)

        })
        .catch( error => {
            console.log(error);
        });
    };

    const convertDate = (dt) => {
        const milliseconds = dt * 1000;
        const dateObject = new Date(milliseconds);
        return dateObject.toLocaleString();
    }


    return (
        <div>
            <br/>
            <input
                type='text'
                value={city}
                onChange={ (e) => setCity(e.target.value)}
            />
            <button style = {{marginLeft: "10px"}}
                onClick={ () => {
                    getWeather(city)
                }}
            >Get Weather</button>
            <div>
                <br/>
                Date and Time: {convertDate(date)}
                <br/>
                {name} - {country}
                <br/>
                Current Temperature: {Math.round(temperature * 100) / 100}°C - {description} <br/>
                <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`}></img><br/>
                Minimum Temperature: {Math.round(tempMin * 100) / 100}°C<br/>
                Maximum Temperature: {Math.round(tempMax * 100) / 100}°C<br/>
                Feels Like: {Math.round(feelsLike * 100) / 100}°C<br/>
                Pressure: {pressure} hPa<br/>
                Humidity: {humidity}%<br/>
                Wind Speed: {windSpeed} <br/>


            </div>
            <br/>
        </div>
    );
};

export default Weather;