import { createContext, useContext, useState } from "react";

const ChartDataContext = createContext();

export const useChartDataContext = () => {
  return useContext(ChartDataContext);
};

export const ChartDataProvider = ({ children }) => {
  const maxDataPoints = 4; // batas jumlah data yang disimpan pada grafik

  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        label: "Value",
        borderColor: "#D32020",
        backdropColor: "#ffff",
        backgroundColor: "#ffff",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  });

  const updateChartData1 = (newData) => {
    const currentTime = new Date().toLocaleTimeString();

    setChartData1((prevData) => {
      const updatedLabels = [...prevData.labels, currentTime];
      const updatedData = [...prevData.datasets[0].data, newData.distances];

      if (updatedLabels.length > maxDataPoints) {
        updatedLabels.shift();
        updatedData.shift();
      }

      return {
        ...prevData,
        labels: updatedLabels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: updatedData,
          },
        ],
      };
    });
  };

  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        label: "Value",
        borderColor: "#ffff",
        backdropColor: "#ffff",
        backgroundColor: "#ffff",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  });

  const updateChartData2 = (newData) => {
    const currentTime = new Date().toLocaleTimeString();

    setChartData2((prevData) => {
      const updatedLabels = [...prevData.labels, currentTime];
      const updatedData = [...prevData.datasets[0].data, newData.distances];

      if (updatedLabels.length > maxDataPoints) {
        updatedLabels.shift();
        updatedData.shift();
      }

      return {
        ...prevData,
        labels: updatedLabels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: updatedData,
          },
        ],
      };
    });
  };

  return (
    <ChartDataContext.Provider
      value={{ chartData1, chartData2, updateChartData1, updateChartData2 }}
    >
      {children}
    </ChartDataContext.Provider>
  );
};
