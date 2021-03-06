const httpServer = require("http").createServer();
const os = require("os-utils");

const ws = require("socket.io")(httpServer, {
  transports: ["websocket"],
});

let updateCpuInterval = 1000;
let updateFreeInterval = 1000;
let updateCpuFreeInterval = 1000;

ws.on("connection", (client) => {
  client.on("updateInterval", (value, type) => {
    value *= 1000;
    if (type == "cpu") updateCpuInterval = value;
    else if (type == "free") updateFreeInterval = value;
    else if (type == "cpuFree") updateCpuFreeInterval = value;
  });

  setInterval(() => {
    os.cpuUsage((percentage) => {
      client.emit("cpu", {
        xAxis: `Time: ${new Date().toLocaleTimeString("en-US")}`,
        cpu: Math.round(percentage * 100),
      });
    });
  }, updateCpuInterval);

  setInterval(() => {
    client.emit("free", {
      xAxis: `Time: ${new Date().toLocaleTimeString("en-US")}`,
      free: Math.round(os.freememPercentage() * 100),
      // free: Math.round(os.freememPercentage() * 50),
      // cpurFree: Math.round(os.freememPercentage() * 75),
    });
  }, updateFreeInterval);

  setInterval(() => {
    os.cpuFree((value) => {
      client.emit("cpuFree", {
        xAxis: `Time: ${new Date().toLocaleTimeString("en-US")}`,
        cpuFree: Math.round(value * 100),
      });
    });
  }, updateCpuFreeInterval);
});

ws.on("end", function () {
  ws.disconnect(0);
});

httpServer.listen(3333);
