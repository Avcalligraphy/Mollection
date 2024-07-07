import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

const data = []; // Data array
const XAXISRANGE = 777600000; // Replace with the appropriate value
let lastDate = new Date().getTime(); // Set to the last date used in your data

const getNewSeries = (baseval, yrange) => {
  const newDate = baseval + 1000;
  lastDate = newDate;
  for (let i = 0; i < data.length - 10; i++) {
    data[i].x = newDate - XAXISRANGE;
  }
  data.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
  });
};

const ApexChart = () => {
  const [series, setSeries] = useState([
    {
      data: data.slice(),
    },
  ]);
  const [options] = useState({
    chart: {
      id: "realtime",
      height: 150,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    // title: {
    //   text: "Moleection Chart",
    //   align: "left",
    // },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      range: XAXISRANGE,
    },
    yaxis: {
      max: 100,
    },
    legend: {
      show: false,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      getNewSeries(lastDate, {
        min: 10,
        max: 90,
      });

      ApexCharts.exec("realtime", "updateSeries", [
        {
          data: data,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-[20px] px-0 py-2 bg-white ">
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={150}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
