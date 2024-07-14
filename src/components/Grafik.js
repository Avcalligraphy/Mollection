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

const Grafik = ({
  color,
  title,
  value,
  valueX,
  valueY,
  distances,
  times,
  updateChartData,
  chartData,
}) => {
  useEffect(() => {
    // Menggunakan updateChartData untuk memperbarui data grafik
    updateChartData({
      times: times,
      distances: distances,
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
        color: "#000",
      },
      legend: {
        display: false, // Menghilangkan kotak legenda
      },
    },
    scales: {
      x: {
        display: true,
        color: "#000",
        innerWidth: 1,
        title: {
          display: true,
          text: valueX,
          color: "#000",
        },
        ticks: {
          color: "#000",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: valueY,
          color: "#000",
        },
        ticks: {
          color: "#000",
          stepSize: 2, // Menyesuaikan interval skala y
          min: 0, // Batas minimum y-axis
          max: 25, // Batas maksimum y-axis
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options}></Line>
    </div>
  );
};

export default Grafik;
