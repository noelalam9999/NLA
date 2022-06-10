import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Combined Line/Bar Chart",
    },
  },
  scales: {
    y: {
      min: -2.5,
      max: 0,
      reverse: true,
      ticks: {
        stepSize: 0.5,
      },
      display: true,
      title: {
        display: true,
        text: "Elasticity",
        color: "#272525",
        font: {
          family: "Roboto",
          size: 12,
          style: "normal",
          lineHeight: 1.2,
        },
        padding: { top: 0, left: 0, right: 0, bottom: 0 },
      },
      type: "linear",
      position: "left",
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
    y1: {
      min: 0.0,
      max: 5.0,
      ticks: {
        stepSize: 1,
      },
      type: "linear",
      display: true,
      position: "right",

      // grid line settings
      grid: {
        drawOnChartArea: true, // only want the grid lines for one axis to show up
      },
    },
  },
};
const labels = [
  "Walgreens",
  "CVS",
  "RiteAid",
  "Meijer",
  "Walmart",
  "Target",
  "Dollar General",
  "Amazon",
];
export const data = {
  labels,
  categoryPercentage: 50,
  datasets: [
    {
      barPercentage: 1.0,
      categoryPercentage: 0.4,
      label: "AW 4 Oz (Night Time)",
      data: [-0.4, -0.5, -0.2, -0.1, -2.0, -1.4, -0.3, -0.6],
      borderColor: "#3366CC",
      fill: false,
      backgroundColor: "#3366CC",
      order: 1,
    },
    {
      type: "line",
      label: "AW 4 Oz (Original)",
      data: [-1.2, -0.6, -0.5, -2.0, -0.9, -0.7, -0.6, -0.7],
      borderColor: "#DC3912",
      backgroundColor: "#DC3912",
      order: 0,
    },
  ],
};
const ChartjsBar = () => {
  return <Bar options={options} data={data} />;
};

export default ChartjsBar;
