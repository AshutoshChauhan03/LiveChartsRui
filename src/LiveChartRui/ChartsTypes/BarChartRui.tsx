import React from "react";
import {
  Bar,
  BarChart,
  Label,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./BarChartRui.css";

function BarChartRui(props: any) {
  return (
    <>
      <div className="upperDiv">
        <h2>{props.name}</h2>
      </div>
      <BarChart width={props.width} height={props.height} data={props.data}>
        <CartesianGrid stroke="#eee" strokeDasharray="8" />
        <Bar
          isAnimationActive={false}
          dataKey="yAxis"
          fill={props.theme?.stroke || "#8884d8"}
        />
        <XAxis tick={false} dataKey="xAxis" padding={{ right: 10, left: 10 }}>
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
        <YAxis>
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
        <Tooltip cursor={false} formatter={(value: any) => value + " %"} />
      </BarChart>
      <div
        style={{
          display: "flex",
          marginTop: "2vh",
          alignItems: "center",
        }}
      >
        <hr
          className="lineStyle"
          style={{
            backgroundColor: props.theme?.stroke || "#8884d8",
          }}
        />
        <p
          style={{
            marginLeft: "10px",
            fontSize: "12px",
          }}
        >
          {props.bottomName}
        </p>
      </div>
    </>
  );
}

export default BarChartRui;
