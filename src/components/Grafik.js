import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useChartDataContext } from "../Redux/ChartDataContext";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);
const Grafik = ({ color, title, value, valueX, valueY, distances, times, updateChartData, chartData }) => {
  useEffect(() => {
    // Menggunakan updateChartData untuk memperbarui data grafik
    updateChartData({
      times: times,
      distances: distances
    });
  }, [times, distances]);

  const options = {
    type: "line",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        color: "#ffff",
      },
    },
    scales: {
      x: {
        display: true,
        color: "#ffff",
        innerWidth: 1,
        title: {
          display: true,
          text: valueX,
          color: "#ffff",
        },
        ticks: {
          color: "#ffff",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: valueY,
          color: "#ffff",
        },
        ticks: {
          color: "#ffff",
        },
      },
    },
  };
  return (
    <div>
      <Line data={chartData} options={options}></Line>
      {/* <Line data={chartData2} options={options}></Line> */}
    </div>
  );
};

export default Grafik;
