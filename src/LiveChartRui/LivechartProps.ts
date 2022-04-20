export default interface LiveChartProps {
  /** @type {number} : Enter range value in minutes*/
  range?: number;

  /** @type { string } : Enter the string to displayed at head of graph */
  name?: string;

  /** @type { string } : Choose which graph to render*/
  type?: "cpu" | "free" | "cpuFree";

  /** @type { {}[] : List of object containing xAxis and yAxis mapping } */
  data?: {}[];
  
  /** @type { string } : Provide websocket connection (websocket must emit object in format { xAxis: value, yAxis: value } */
  ws?: any;

  /** @type { number } : Choose width of graph*/
  width?: number;

  /** @type { number } : Choose height of graph*/
  height?: number;

  /** @type { string } : Enter the update interval for default WS in seconds ( Incase of custom ws emit on favourable intervals )
   * Livechart emit on connected socket as -> ws.emit("updateInterval", updateInterval, type)*/
  updateInterval?: number;

  /** @type { string } : Choose the type of graph to render */
  graphType?: "LineChart" | "AreaChart";

  /** @type { string } : Select the theme for the graph */
  theme?: {
    stroke: string;
    CartesianGrid?: string;
    Legend_verticalAlign?: string;
  };

  /** @type { object } : Style the main div of the graph */
  style?: object;

  /** @type { number } : Set threshold for graph ( yAxis ) */
  threshold?: number;
  /** @type { number } : Callback when threshold is reached ( yAxis ) */
  thresholdCallBack?: (err: any) => void;
}
