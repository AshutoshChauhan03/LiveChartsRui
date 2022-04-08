import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { io } from "socket.io-client";

interface LiveChartProps {
  range?: number;
  type?: "cpu" | "free" | "cpuFree";
  wsUrl?: string;
  width?: number;
  height?: number;
  // updateTime?: object;
  // graphType?: "LineChart" | "AreaChart"
  defaultProps?: object;
}

function LiveChart({
  range = 2,
  type = "cpu",
  wsUrl = "http://localhost:3333",
  width = 400,
  height = 300,
}: LiveChartProps) {
  const newRange = new Array(range * 60).fill(0);

  let ws: any;
  useEffect(() => {
    ws = io(wsUrl, {
      transports: ["websocket", "polling"],
    });
  }, []);

  const [cpu, setCpu] = useState(newRange);
  if (type === "cpu") {
    useEffect(() => {
      ws.on("cpu", (percentage: number) => {
        setCpu((currentData: any): any => {
          const temp = [...currentData, percentage];
          temp.shift();
          return temp;
        });
      });
    }, []);
  }

  const [free, setFree] = useState(newRange);
  if (type === "free") {
    useEffect(() => {
      ws.on("free", (percentage: number) => {
        setFree((currentData) => {
          const temp = [...currentData, percentage];
          temp.shift();
          return temp;
        });
      });
    }, []);
  }

  const [cpuFree, setCpuFree] = useState(newRange);
  if (type === "cpuFree") {
    useEffect(() => {
      ws.on("cpuFree", (value: number) => {
        setCpuFree((currentData) => {
          const temp = [...currentData, value];
          temp.shift();
          return temp;
        });
      });
    }, []);
  }

  return (
    <div>
      {type === "cpu" && (
        <LineChart width={width} height={height} data={cpu}>
          <Legend verticalAlign="top" height={36} />
          <XAxis tick={false} dataKey="second" padding={{ right: 50 }}>
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
          <YAxis dataKey="value">
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
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line
            dot={false}
            isAnimationActive={false}
            name="CPU Utilization"
            dataKey="value"
          />
        </LineChart>
      )}

      {type === "free" && (
        <LineChart width={width} height={height} data={free}>
          <Legend verticalAlign="top" height={36} />
          <XAxis tick={false} dataKey="second">
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
          <YAxis dataKey="value">
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
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line
            dot={false}
            isAnimationActive={false}
            name="RAM Utilization"
            dataKey="value"
          />
        </LineChart>
      )}

      {type === "cpuFree" && (
        <LineChart width={width} height={height} data={cpuFree}>
          <Legend verticalAlign="top" height={36} />
          <XAxis tick={false} dataKey="second">
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
          <YAxis dataKey="value">
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
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line
            dot={false}
            isAnimationActive={false}
            name="CPU Available"
            dataKey="value"
          />
        </LineChart>
      )}
    </div>
  );
}

export default LiveChart;
