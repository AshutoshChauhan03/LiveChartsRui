import "./App.css";
import { useState } from "react";
import { io } from "socket.io-client";
import LiveChart from "./LiveChartRui/LiveChartRui";

let ws: any = null;
ws = io("http://localhost:3333", {
  transports: ["websocket"],
});

function App() {
  const [type, setType] = useState("LineChart");
  let handler = () => {
    if (type == "LineChart") setType("AreaChart");
    else setType("LineChart");
  };

  return (
    <div>
      <div
        className="App"
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <LiveChart
          ws={ws}
          type="cpu"
          range={0.5}
          threshold={21}
          thresholdCallBack={(err) => {
            console.log("Threshold touched : " + JSON.stringify(err));
          }}
          name="CPU Utilization"
          graphType={"BarChart"}
        />
        {type !== "AreaChart" && (
          <LiveChart
            ws={ws}
            type="free"
            name="RAM Available"
            graphType={"AreaChart"}
          />
        )}
        {type !== "AreaChart" && (
          <LiveChart
            ws={ws}
            type="cpuFree"
            name="CPU Available"
            graphType={"AreaChart"}
          />
        )}
        {type !== "LineChart" && (
          <LiveChart
            ws={ws}
            theme={{ stroke: "#008000" }}
            type="free"
            name="RAM Available"
            graphType={"LineChart"}
          />
        )}
        {type !== "LineChart" && (
          <LiveChart
            ws={ws}
            type="cpuFree"
            name="CPU Available"
            graphType={"LineChart"}
          />
        )}
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
        <button className="btnStyle" onClick={handler}>
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
