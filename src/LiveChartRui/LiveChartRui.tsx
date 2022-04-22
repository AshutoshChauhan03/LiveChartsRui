import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LiveChartProps from "./LivechartProps";
import AreaChartRui from "./ChartsTypes/AreaChartRui";
import LineChartRui from "./ChartsTypes/LineChartRui";
import BarChartRui from "./ChartsTypes/BarChartRui";

let ws: any = null;

function LiveChart({
  range = 2,
  on = "cpu",
  width = 425,
  height = 225,
  updateInterval = 1,
  graphType = "LineChart",
  threshold = 100,
  bottomName = "Value in percentage",
  ...props
}: LiveChartProps) {
  const newRange = new Array(range * 60).fill(0);

  useEffect(() => {
    if (props.data == undefined) {
      if (props.ws != undefined) {
        ws = props.ws;
        if (ws.connected) console.log(`<--- Connected to given socket --->`);
      } else {
        console.log(
          "<--- No socket connection provided connecting to default socket --->"
        );

        ws = io("http://localhost:3333", {
          transports: ["websocket"],
        });
      }
      ws.emit("updateInterval", updateInterval, on);
    }
  }, []);

  let [data, setData] = useState(newRange);

  useEffect(() => {
    if (props.data != undefined) {
      setData(props.data);
    } else {
      ws.on(on, (value: any) => {
        if (value.yAxis > threshold && props.thresholdCallBack)
          props.thresholdCallBack(value);

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
          <LineChartRui
            width={width}
            height={height}
            data={data}
            name={props.name}
            theme={props.theme}
            yAxisName={props.yAxisName}
            bottomName={bottomName}
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
          yAxisName={props.yAxisName}
          bottomName={bottomName}
        />
      )}
      {graphType === "BarChart" && (
        <BarChartRui
          width={width}
          height={height}
          data={data}
          name={props.name}
          theme={props.theme}
          yAxisName={props.yAxisName}
          bottomName={bottomName}
        />
      )}
    </div>
  );
}

export default LiveChart;
