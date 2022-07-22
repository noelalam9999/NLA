import React, { useState, useEffect } from "react";
import axios from "axios";
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
      max: 20.0,
      ticks: {
        stepSize: 5,
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
// const labels = [
//   "Walgreens",
//   "CVS",
//   "RiteAid",
//   "Meijer",
//   "Walmart",
//   "Target",
//   "Dollar General",
//   "Amazon",
// ];

const ChartjsBar = () => {
  const [tableData, setTableData] = useState();

  const getdata = async () => {
    try {
      const config = {
        headers: {
          // Authorization: `${user.token_type} ${user.access_token}`,
        },
      };
      const api = `http://35.239.41.208:8082/insights?userid=user1&projectid=project1`;
      var res = await axios.get(api);
      console.log("Graph Response: ", res.data.data);
      setTableData(res.data.data);
      if (res.status === 200) {
        // console.log("Graph Response: ", res);
      }
    } catch (error) {
      // setLoadingOn(false);
      console.log("Error", error.response);
    }
  };
  const price = tableData?.elasticity?.map((val) => val.price);
  const elasticity = tableData?.elasticity?.map((val) => val.elasticity);
  const labels = tableData?.elasticity?.map((val) => val.retailer);
  useEffect(() => {
    getdata();
  }, []);
  const data = {
    labels,
    categoryPercentage: 50,
    datasets: [
      {
        // barPercentage: 1.0,
        // categoryPercentage: 0.4,
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
        data: elasticity,
        borderColor: "#DC3912",
        backgroundColor: "#DC3912",
        order: 0,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default ChartjsBar;
