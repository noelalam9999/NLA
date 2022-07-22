import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
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
  interaction: {
    //mode: 'nearest',
    intersect: false,
  },
  plugins: {
    title: {
      display: false,
      text: "Chart top heading here",
    },
    legend: {
      position: "bottom",
      display: true,
      labels: {
        color: "#272525",
      },
    },
  },
  scales: {
    y: {
      min: 1,
      max: 16,
      ticks: {
        stepSize: 3,
      },
      display: true,
      title: {
        display: true,
        text: "Price",
        color: "#272525",
        font: {
          family: "Roboto",
          size: 12,
          style: "normal",
          lineHeight: 1.2,
        },
        padding: { top: 0, left: 0, right: 0, bottom: 0 },
      },

      label: "price",
      type: "linear",
      position: "left",
      grid: {
        drawOnChartArea: true, // only want the grid lines for one axis to show up
      },
    },
  },
};

const labels = [
  "CVS",
  "Walgreens",
  "RiteAid",
  "Meijer",
  "Target",
  "Walmart",
  "Amazon",
  "Dollar General",
];

const Chartjs = () => {
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
  useEffect(() => {
    getdata();
  }, []);
  const data = {
    labels,
    datasets: [
      {
        label: "AW 4 Oz (Night Time)",
        data: [16, 14, 13, 10, 9, 8.5, 8],
        borderColor: "#3366CC",
        fill: false,
        backgroundColor: "#3366CC",
      },
      // {
      //   label: "AW 4 Oz (Original)",
      //   data: price,
      //   borderColor: "#DC3912",
      //   backgroundColor: "#DC3912",
      // },
      // {
      //   label: "AW 4 Oz (Original)",
      //   //data: [5,6],
      //   data: [
      //     { x: "Amazon", y: 5 },
      //     { x: "Dollar General", y: 7 },
      //   ],
      //   borderColor: "#109618",
      //   backgroundColor: "#109618",
      // },
      // {
      //   label: "AW 4 Oz (Night Time)",
      //   //data: [6, 6],
      //   data: [
      //     { x: "Amazon", y: 6 },
      //     { x: "Dollar General", y: 7 },
      //   ],
      //   borderColor: "#FF9900",
      //   backgroundColor: "#FF9900",
      // },
    ],
  };
  return <Line options={options} data={data} />;
};

export default Chartjs;
