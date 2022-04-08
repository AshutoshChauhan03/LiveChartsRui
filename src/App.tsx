import LiveChart from "./LiveChartRui";
import { Legend } from "recharts";

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <LiveChart type="cpu" />
      <LiveChart type="free" />
      <LiveChart type="cpuFree" />
    </div>
  );
}

export default App;
