import { createContext, useContext, useState } from 'react';

const ChartDataContext = createContext();

export const useChartDataContext = () => {
  return useContext(ChartDataContext);
};

export const ChartDataProvider = ({ children }) => {
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
    setChartData1((prevData) => ({
      ...prevData,
      labels: [...prevData.labels, newData.times],
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, newData.distances],
        },
      ],
    }));
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
    setChartData2((prevData) => ({
      ...prevData,
      labels: [...prevData.labels, newData.times],
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, newData.distances],
        },
      ],
    }));
  };

  return (
    <ChartDataContext.Provider
      value={{ chartData1, chartData2, updateChartData1, updateChartData2 }}
    >
      {children}
    </ChartDataContext.Provider>
  );
};
