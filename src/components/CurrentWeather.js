import React from "react";

function CurrentWeather(props) {
  return (
    <div className="current-weather-container flex items-center flex-col">
      <div className="current-weather flex flex-row items-center">
        {props.icon ? (
          <img
            className="weather-icon"
            alt="weather-img"
            src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}>
          </img>
        ) : null}
        <p className="temp text-4xl mr-8">{props.temp} &deg;C</p>
      </div>
      <h2 className="condition text-4xl">{props.weather}</h2>
    </div>
  );
}

export default CurrentWeather;
