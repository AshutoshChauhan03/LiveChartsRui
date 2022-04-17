import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LiveChartProps from "./LivechartProps";
import AreaChartRui from "./ChartsTypes/AreaChartRui";
import LineChartRui from "./ChartsTypes/LineChartRui";

let ws: any = null;

function LiveChart({
  range = 5,
  type = "cpu",
  width = 400,
  height = 300,
  updateInterval = 1,
  graphType = "LineChart",
  ...props
}: LiveChartProps) {
  const newRange = new Array(range * 60).fill(0);

  useEffect(() => {
    if (props.ws != undefined) ws = props.ws;
    else {
      ws = io("http://localhost:3333", {
        transports: ["websocket"],
      });

      ws.emit("updateInterval", updateInterval, type);
    }
  }, []);

  let [data, setData] = useState(newRange);

  useEffect(() => {
    if (props.data != undefined) {
      setData(props.data);
    } else {
      ws.on(type, (value: {}) => {
        setData((currentData: any): any => {
          const temp = [...currentData, value];
          temp.shift();
          return temp;
        });
      });

      return () => {
        setData([]);
      };
    }
  }, []);

  return (
    <div style={props.style}>
      {graphType === "LineChart" && (
        <>
          <LineChartRui width={width} height={height} data={data} />
        </>
      )}

      {graphType === "AreaChart" && (
        <AreaChartRui width={width} height={height} data={data} />
      )}
    </div>
  );
}

export default LiveChart;
