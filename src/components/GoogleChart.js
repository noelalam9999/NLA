import React from "react";
import { Chart } from "react-google-charts";
const GoogleChart = () => {
  const data = [
    ["X", "Sales", "Expenses"],
    [-10, 14, 1],
    [-8, 12, 2],
    [-6, 8, 3],
    [-4, 4, 4],
    [-2, 1, 5],
    [0, 0, 7],
    [2, -1, 8],
    [4, -4, 10],
    [6, -8, 12],
    [8, -12, 15],
    [10, -14, 11],
  ];
  var options = {
    // title: "Company Performance",
    pointSize: 3,
    legend: { position: "bottom" },
    hAxis: {
      gridlines: {
        count: -1,
      },
    },
    vAxis: {
      ticks: [-15, -11, -7, -3, 0, 3, 7, 11, 15],
    },
    height: "100%",
  };
  return (
    <Chart
      chartType="LineChart"
      data={data}
      width="100%"
      height="400px"
      options={options}
      legendToggle
    />
  );
};

export default GoogleChart;
