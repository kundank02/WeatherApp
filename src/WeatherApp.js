import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Conditions from "./components/Conditions";
import Forecast from "./components/Forecast";
import Chart from "./components/Chart";
import "./weatherApp.css";

function WeatherApp() {
  //hold weather data
  const [currentWeather, setCurrentWeather] = useState({
    weather: "",
    temp: "",
    icon: "",
    humidity: "",
    windSpeed: "",
    city: "",
  });

  //hold forecast data
  const [midDayForecastData, setMidDayForecastData] = useState(null);

  const [searchedCity, setSearchedCity] = useState("");

  const [allForecastData, setAllForecastData] = useState(null);

  const [selectedForecast, setSelectedForecast] = useState("");

  //holds forcast button name when clicked so we can set a color on that button
  const [activeButton, setActiveButton] = useState({
    id: "",
    class: "",
  });

  //when the app iniaitlly runs we're getting the user's location and setting weather and forecast state to that location

  //grab weather data from api
  async function getWeatherData(url) {
    try {
      const { data } = await axios.get(url);
      setCurrentWeather((prevWeather) => ({
        ...prevWeather,
        weather: data.weather[0].main,
        temp: Math.round(data.main.temp),
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6 * 100) / 100,
        city: data.name,
      }));
    } catch (error) {
      alert("Enter valid city name");
    }
  }

  //grab forecast data from api
  async function getForecastData(url) {
    const { data } = await axios.get(url);
    // console.log(data);
    setAllForecastData(data.list);
    let filteredData = data.list.filter((item) => {
      return item.dt_txt.includes("12:00");
    });
    setMidDayForecastData(filteredData);
  }

  //check for geolocation when app renders, if location found, then get data from API
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position);
        getWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=3a97fa20e67f8d119b0cb0c96a83d4ef`
        );
        getForecastData(
          `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=3a97fa20e67f8d119b0cb0c96a83d4ef`
        );
      });
    } else {
      alert("location not available");
    }
  }, []);

  //handle forcast button clicks
  function handleForecastClick(e) {
    setActiveButton((prev) => ({
      id: e.target.id,
      class: e.target.className,
    }));

    setSelectedForecast(e.target.id);
  }

  function handleInputChange(e) {
    setSearchedCity(e.target.value);
  }

  //handle search bar submission and get api data from entered city
  function handleFormSubmit(e) {
    e.preventDefault();

    getWeatherData(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${searchedCity}&appid=3a97fa20e67f8d119b0cb0c96a83d4ef`
    );

    getForecastData(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${searchedCity}&appid=3a97fa20e67f8d119b0cb0c96a83d4ef`
    );

    setSearchedCity("");
  }

  return (
    <div className="weather-container rounded-lg h-full w-full bg-white mt-24 grid p-5 shadow-lg shadow-slate-600">
      <div className="search-bar flex flex-col">
        <form onSubmit={handleFormSubmit}>
          <input
            className="w-52 h-8 p-4 rounded-md border border-gray-400"
            type="text"
            placeholder="Search a City"
            value={searchedCity}
            onChange={handleInputChange}
          ></input>
          <button className="h-full rounded-lg border-0 bg-blue-500 text-white ml-4 w-12 hover:bg-blue-600">
            Go
          </button>
        </form>

        <div className="city text-center mt-6 opacity-90 text-2xl">
          <h2>{currentWeather.city}</h2>
        </div>
      </div>

      {currentWeather ? (
        <CurrentWeather
          weather={currentWeather.weather}
          temp={currentWeather.temp}
          icon={currentWeather.icon}
          activeButton={activeButton.class}
        />
      ) : null}

      {currentWeather ? (
        <Conditions
          humidity={currentWeather.humidity}
          windSpeed={currentWeather.windSpeed}
        />
      ) : null}

      {allForecastData ? (
        <Chart
          currentTemp={currentWeather.temp}
          selectedForecast={selectedForecast}
          allForecastData={allForecastData}
          activeButton={activeButton.class}
        />
      ) : null}

      {midDayForecastData ? (
        <Forecast
          forecastData={midDayForecastData}
          handleClick={handleForecastClick}
          isActive={activeButton.id}
          checkClass={activeButton.class}
        />
      ) : null}
    </div>
  );
}

export default WeatherApp;
