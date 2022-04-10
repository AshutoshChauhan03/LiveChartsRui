import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LiveChartProps {
  /** @type {number} : Enter range value in minutes*/
  range?: number;

  /** @type { string } : Enter the string to displayed at head of graph */
  name?: string;

  /** @type { string } : Choose which graph to render*/
  type?: "cpu" | "free" | "cpuFree";

  /** @type { string } : Enter the websocket url (websocket must emit object in format { xAxis: value, yAxis: value } */
  ws?: string;

  /** @type { number } : Choose width of graph*/
  width?: number;

  /** @type { number } : Choose height of graph*/
  height?: number;

  /** @type { string } : Choose the update interval for default WS ( Incase of custom ws emit on favourable intervals ) */
  updateInterval?: "1s" | "5s" | "10s";

  /** @type { string } : Choose the type of graph to render */
  graphType?: "LineChart" | "AreaChart";

  /** @type { string } : Select the theme for the graph */
  theme?: {
    CartesianGrid?: string;
    Legend_verticalAlign?: string;
  };

  /** @type { object } : Style the main div of the graph */
  style?: object;
}

let ws: any = null;

function LiveChart({
  range = 5,
  name = "Chart Visualization",
  type = "cpu",
  width = 400,
  height = 300,
  updateInterval = "1s",
  graphType = "LineChart",
  ...props
}: LiveChartProps) {
  const newRange = new Array(range * 60).fill(0);

  useEffect(() => {
    if (props.ws != undefined) ws = props.ws;
    else {
      ws = io("http://localhost:3333", {
        transports: ["websocket", "polling"],
      });
      if (updateInterval === "5s") ws.emit("updateInterval", 5000);
      else if (updateInterval === "10s") ws.emit("updateInterval", 10000);
      else ws.emit("updateInterval", 1000);
    }
  }, []);

  let [data, setData] = useState(newRange);
  useEffect(() => {
    ws.on(type, (value: number) => {
      setData((currentData: any): any => {
        const temp = [...currentData, value];
        temp.shift();
        return temp;
      });
    });

    return () => {
      setData([]);
    };
  }, []);

  return (
    <div style={props.style}>
      {graphType === "LineChart" && (
        <LineChart width={width} height={height} data={data}>
          <Legend verticalAlign="top" height={36} />
          <XAxis tick={false} dataKey="xAxis" padding={{ right: 50 }}>
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "75%",
                padding: "100px",
                fill: "grey",
              }}
              value={"Time seconds"}
            />
          </XAxis>
          <YAxis
            dataKey="yAxis"
            tickFormatter={(number) => `${number.toFixed(0)}`}
          >
            <Label
              dx={-15}
              style={{
                textAnchor: "middle",
                fontSize: "75%",
                fill: "grey",
              }}
              angle={270}
              value={"Percentage %"}
              position="middle"
            />
          </YAxis>
          <Tooltip formatter={(value: any) => value + " %"} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line
            dot={false}
            isAnimationActive={false}
            name={name}
            dataKey="yAxis"
          />
        </LineChart>
      )}

      {graphType === "AreaChart" && (
        <AreaChart width={width} height={height} data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            name={name}
            dataKey="yAxis"
            isAnimationActive={false}
            fill="url(#color)"
          />
          <Legend verticalAlign="top" height={36} />

          <XAxis tick={false} dataKey="xAxis" padding={{ right: 50 }}>
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "75%",
                padding: "100px",
                fill: "grey",
              }}
              value={"Time seconds"}
            />
          </XAxis>
          <YAxis
            dataKey="yAxis"
            tickFormatter={(number) => `${number.toFixed(0)}`}
          >
            <Label
              dx={-15}
              style={{
                textAnchor: "middle",
                fontSize: "75%",
                fill: "grey",
              }}
              angle={270}
              value={"Percentage %"}
              position="middle"
            />
          </YAxis>
          <Tooltip formatter={(value: any) => value + " %"} />
          <CartesianGrid stroke="#eee" strokeDasharray="5" />
        </AreaChart>
      )}
    </div>
  );
}

export default LiveChart;
