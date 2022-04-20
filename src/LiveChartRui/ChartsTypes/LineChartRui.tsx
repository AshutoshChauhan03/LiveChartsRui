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
  // props.yList.shift();

  return (
    <>
      <div className="upperDiv">
        <h2>{props.name}</h2>
      </div>
      <LineChart width={props.width} height={props.height} data={props.data}>
        <CartesianGrid stroke="#eee" strokeDasharray="8" />
        {/* {props.yList.map((ele: any) => {
          console.log(ele); */}
        <Line
          dot={false}
          isAnimationActive={false}
          name={"yAxis"}
          dataKey={"yAxis"}
          stroke={props.theme?.stroke || "#8884d8"}
        />
        ;{/* })} */}
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
          Value in percentage
        </p>
      </div>
    </>
  );
}

export default LineChartRui;
