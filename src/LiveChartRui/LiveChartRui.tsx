import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LiveChartProps from "./LivechartProps";
import AreaChartRui from "./ChartsTypes/AreaChartRui";
import LineChartRui from "./ChartsTypes/LineChartRui";

let ws: any = null;
let yList: {}[] = [];

function LiveChart({
  range = 3,
  type = "cpu",
  width = 425,
  height = 225,
  updateInterval = 1,
  graphType = "LineChart",
  threshold = 100,
  ...props
}: LiveChartProps) {
  const newRange = new Array(range * 60).fill(0);

  useEffect(() => {
    if (props.data == undefined) {
      if (props.ws != undefined) ws = props.ws;
      else {
        ws = io("http://localhost:3333", {
          transports: ["websocket"],
        });
      }
      ws.emit("updateInterval", updateInterval, type);
    }
  }, []);

  let [data, setData] = useState(newRange);

  useEffect(() => {
    if (props.data != undefined) {
      setData(props.data);
    } else {
      ws.on(type, (value: any) => {
        if (value.yAxis > threshold && props.thresholdCallBack)
          props.thresholdCallBack(value);

        setData((currentData: any): any => {
          yList = Object.entries(value);

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
          <LineChartRui
            width={width}
            height={height}
            data={data}
            name={props.name}
            theme={props.theme}
            yList={yList}
          />
        </>
      )}
      {graphType === "AreaChart" && (
        <AreaChartRui
          width={width}
          height={height}
          data={data}
          name={props.name}
          theme={props.theme}
        />
      )}
    </div>
  );
}

export default LiveChart;
