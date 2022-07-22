import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
const GoogleChart = () => {
  const [tableData, setTableData] = useState();

  const getdata = async () => {
    try {
      const config = {
        headers: {
          // Authorization: `${user.token_type} ${user.access_token}`,
        },
      };
      const api = `http://35.239.41.208:8082/insights?userid=user1&projectid=project1`;
      // const api = `//35.239.41.208:8082/insights?userid=user1&projectid=project1`;
      var res = await axios.get(api);
      console.log("Graph Response: ", res.data.data);

      if (res.status === 200) {
        setTableData(res.data.data);
        // console.log("Graph Response: ", res);
      }
    } catch (error) {
      // setLoadingOn(false);
      console.log("Error", error.response);
    }
  };
  const price = tableData?.priceandvolumevariance?.map(
    (val) => val.pricechange
  );
  const dollarimpact = tableData?.priceandvolumevariance?.map(
    (val) => val.dollarimpact
  );
  const volumeimpact = tableData?.priceandvolumevariance?.map(
    (val) => val.volumeimpact
  );
  console.log(price?.[0]);
  useEffect(() => {
    getdata();
  }, []);
  const data = [
    ["X", "Dollar Impact", "Volume Impact"],
    [price?.[0], dollarimpact?.[0], volumeimpact?.[0]],
    [price?.[1], dollarimpact?.[1], volumeimpact?.[1]],
    [price?.[2], dollarimpact?.[2], volumeimpact?.[2]],
    [price?.[3], dollarimpact?.[3], volumeimpact?.[3]],
    [price?.[4], dollarimpact?.[4], volumeimpact?.[4]],
    [price?.[5], dollarimpact?.[5], volumeimpact?.[5]],
    [price?.[6], dollarimpact?.[6], volumeimpact?.[6]],
    [price?.[7], dollarimpact?.[7], volumeimpact?.[7]],
    [price?.[8], dollarimpact?.[8], volumeimpact?.[8]],
    [price?.[9], dollarimpact?.[9], volumeimpact?.[9]],
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
    height: 300,
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
