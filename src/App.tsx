import "./App.css";
import { useState } from "react";
import { io } from "socket.io-client";
import LiveChart from "./LiveChartRui/LiveChartRui";

let ws: any = null;
ws = io("http://localhost:3333", {
  transports: ["websocket"],
});

function App() {
  const [type, setType] = useState<"LineChart" | "AreaChart" | "BarChart">(
    "LineChart"
  );
  let typeHandler = () => {
    if (type == "LineChart") setType("AreaChart");
    else setType("LineChart");
  };

  return (
    <div>
      <div className="container">
        <LiveChart
          ws={ws}
          on="cpu"
          updateInterval={2}
          range={0.5}
          name="CPU Utilization"
          graphType={"BarChart"}
          threshold={21}
          thresholdCallBack={(err) => {
            console.log("Threshold touched : " + JSON.stringify(err));
          }}
        />

        <LiveChart
          ws={ws}
          range={60}
          on="free"
          name="RAM Available"
          theme={{ stroke: "red" }}
          graphType={type}
        />

        <LiveChart ws={ws} on="cpuFree" name="CPU Available" graphType={type} />
      </div>
      <div
        className="btns"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <button className="btnStyle" onClick={typeHandler}>
          {type}
        </button>
      </div>
    </div>
  );
}

export default App;

// [
//   {
//     xAxis: "xAxis",
//     yAxis: 43,
//   },
//   {
//     xAxis: "xAxis",
//     yAxis: 73,
//   },
//   {
//     xAxis: "xAxis",
//     yAxis: 93,
//   },
//   {
//     xAxis: "xAxis",
//     yAxis: 23,
//   },
//   {
//     xAxis: "xAxis",
//     yAxis: 83,
//   },
//   {
//     xAxis: "xAxis",
//     yAxis: 42,
//   },
//   {
//     xAxis: "xAxis",
//     yAxis: 13,
//   },
//   {
//     xAxis: "xAxis",
//     yAxis: 43,
//   },
//   {
//     xAxis: "xAxis",
//     yAxis: 43,
//   },
// ];
