import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LiveChartProps from "../LivechartProps";

function AreaChartRui(props: LiveChartProps) {
  return (
    <>
      <AreaChart width={props.width} height={props.height} data={props.data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area
          name={props.name}
          dataKey="yAxis"
          isAnimationActive={false}
          fill="url(#color)"
        />
        {props.name && <Legend verticalAlign="top" height={36} />}
        <CartesianGrid strokeDasharray="8" stroke="#DFE2E6" />

        <XAxis tick={false} dataKey="xAxis" padding={{ right: 50 }}>
          <Label
            style={{
              textAnchor: "middle",
              fontSize: "75%",
              padding: "100px",
              fill: "#666666",
            }}
            value={"Time seconds"}
          />
        </XAxis>
        <YAxis dataKey="yAxis">
          <Label
            dx={-15}
            style={{
              textAnchor: "middle",
              fontSize: "75%",
              fill: "#666666",
            }}
            angle={270}
            value={"Percentage %"}
            position="middle"
          />
        </YAxis>
        <Tooltip formatter={(value: any) => value + " %"} />
      </AreaChart>
      <div
        style={{
          display: "flex",
          marginTop: "2vh",
          alignItems: "center",
        }}
      >
        <hr
          style={{
            width: "3vw",
            backgroundColor: "#2451B7",
            opacity: "0.5",
            border: "none",
            height: "2px",
            marginLeft: "4vw",
            borderRadius: "2px",
            display: "inline-block",
          }}
        />
        <p
          style={{
            marginLeft: "10px",
            fontSize: "14px",
          }}
        >
          Value in percentage
        </p>
      </div>
    </>
  );
}

export default AreaChartRui;
