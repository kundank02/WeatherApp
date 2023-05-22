import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Chart(props) {
  //trying to get today's date so we can match today with today's weather from the api
  let date = new Date();
  let today = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  if (month.length === 1) {
    month = "0" + month;
  }

  let temps = [];
  let todayTemps = [];

  let todayArr = props.allForecastData.filter((item) => {
    return item.dt_txt.includes(month + "-" + today);
  });

  let todayFiltered = todayArr.filter((item) => {
    return item.main.temp;
  });

  if (!props.activeButton) {
    todayTemps.push(todayFiltered);
  }

  let filtered = props.allForecastData.filter((item) => {
    return item.dt_txt.includes(props.selectedForecast.slice(0, 10));
  });

  filtered.map((item) => {
    return temps.push(item);
  });

  return (
    <div className="weather-graph">
      <div className="graph w-11/12">
        <Line
          data={{
            labels:
              props.activeButton.includes("blue-card current-weather") ||
              !props.activeButton
                ? todayArr.map((item) => item.dt_txt.slice(10, 19))
                : temps.map((item) => item.dt_txt.slice(10, 19)),

            datasets: [
              {
                label: "Temperature",
                data:
                  props.activeButton.includes("blue-card") ||
                  !props.activeButton
                    ? todayArr.map((item) => Math.round(item.main.temp))
                    : temps.map((item) => Math.round(item.main.temp)),
                fill: true,
                backgroundColor: "#5596f67a",
                borderColor: "#5596f6",
                pointStyle: "circle",
                pointRadius: 5,
                pointHoverRadius: 10,
                lineTension: 0.3,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Chart;
