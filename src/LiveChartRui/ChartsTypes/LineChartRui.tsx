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
import LiveChartProps from "../LivechartProps";

function LineChartRui(props: LiveChartProps) {
  return (
    <>
      <LineChart width={props.width} height={props.height} data={props.data}>
        {props.name && <Legend verticalAlign="top" height={36} />}

        <CartesianGrid stroke="#eee" strokeDasharray="8" />

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
        <Line
          dot={false}
          isAnimationActive={false}
          name={props.name}
          dataKey="yAxis"
        />
      </LineChart>
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

export default LineChartRui;
