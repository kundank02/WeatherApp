import React from "react";

function Forecast(props) {
  let mappedData = props.forecastData.map((item, index) => {
    return (
      <div
        onClick={props.handleClick}
        key={item.dt}
        className={`forecast-card bg-white rounded-xl w-40 h-52 flex justify-center items-center flex-col flex-nowrap hover:bg-blue-400 hover:text-white ${
          props.isActive === item.dt_txt &&
          !props.checkClass.includes("bg-blue-500")
            ? "bg-blue-500"
            : ""
        }`}
        id={item.dt_txt}
        value={index}
      >
        <p className="forecast-date opacity-70">{item.dt_txt.slice(5, 10)}</p>
        <div className="forecast-conditions flex flex-row items-center justify-center pointer-events-none">
          <img
          className="w-20 pointer-events-none"
            alt="weather"
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          ></img>
          <p className="pointer-events-none">{Math.round(item.main.temp)} &deg;C</p>
        </div>

        <p className="forecast-humidity opacity-70 pointer-events-none">Humidity</p>
        <p>{item.main.humidity}%</p>
      </div>
    );
  });

  return <div className="weather-forecast justify-center items-center flex gap-7">{mappedData}</div>;
}

export default Forecast;
