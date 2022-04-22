import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./LineChartRui.css";

function LineChartRui(props: any) {
  return (
    <>
      <div className="upperDiv">
        <h2>{props.name}</h2>
      </div>
      <LineChart width={props.width} height={props.height} data={props.data}>
        <CartesianGrid stroke="#eee" strokeDasharray="8" />
        {props.yList.map((ele: any) => {
          return (
            <Line
              dot={false}
              key={ele[0]}
              name={props.yAxisName}
              isAnimationActive={false}
              dataKey={ele[0]}
              stroke={props.theme?.stroke || "#8884d8"}
            />
          );
        })}
        <XAxis tick={false} dataKey={props.xList[0]} padding={{ right: 50 }}>
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
        <Tooltip formatter={(value: any) => value + " %"} />
      </LineChart>
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

export default LineChartRui;
