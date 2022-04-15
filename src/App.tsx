import LiveChart from "./LiveChartRui";
import "./App.css";
import { useState } from "react";

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
        {type !== "AreaChart" && (
          <LiveChart
            type="cpu"
            name="CPU Utilization"
            graphType={"AreaChart"}
            updateInterval="5s"
          />
        )}
        {type !== "AreaChart" && (
          <LiveChart type="free" name="RAM Available" graphType={"AreaChart"} />
        )}
        {type !== "AreaChart" && (
          <LiveChart
            type="cpuFree"
            name="CPU Available"
            graphType={"AreaChart"}
          />
        )}

        {type !== "LineChart" && (
          <LiveChart
            type="cpu"
            name="CPU Utilization"
            graphType={"LineChart"}
          />
        )}
        {type !== "LineChart" && (
          <LiveChart type="free" name="RAM Available" graphType={"LineChart"} />
        )}
        {type !== "LineChart" && (
          <LiveChart
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
