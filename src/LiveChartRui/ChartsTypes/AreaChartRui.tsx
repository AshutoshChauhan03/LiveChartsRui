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
import "./LineChartRui.css";

function AreaChartRui(props: any) {
  let randomKey = Math.random().toString();
  let fillString = `url(#${randomKey})`;

  return (
    <>
      <div className="upperDiv">
        <h2>{props.name}</h2>
      </div>
      <AreaChart width={props.width} height={props.height} data={props.data}>
        <defs>
          <linearGradient id={randomKey} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={props.theme?.stroke || "#82ca9d"}
              stopOpacity={0.7}
            />
            <stop
              offset="100%"
              stopColor={props.theme?.stroke || "#82ca9d"}
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="8" stroke="#DFE2E6" />

        {props.yList.map((ele: any) => {
          console.log(ele[0]);

          return (
            <Area
              name={props.yAxisName}
              key={ele[0]}
              dataKey={ele[0]}
              isAnimationActive={false}
              stroke={props.theme?.stroke || "#82ca9d"}
              fill={fillString}
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
      </AreaChart>
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
            backgroundColor: props.theme?.stroke || "#82ca9d",
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

export default AreaChartRui;
