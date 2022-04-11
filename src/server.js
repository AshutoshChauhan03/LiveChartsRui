const httpServer = require("http").createServer();
const os = require("os-utils");

const ws = require("socket.io")(httpServer, {
  transports: ["websocket"],
});

let updateInterval = 1000;

ws.on("connection", (client) => {
  client.on("updateInterval", (value) => {
    updateInterval = value;
  });

  setInterval(() => {
    os.cpuUsage((percentage) => {
      client.emit("cpu", {
        xAxis: new Date().toLocaleString("en-US"),
        yAxis: Math.round(percentage * 100),
      });
    });

    client.emit("free", {
      xAxis: new Date().toLocaleString("en-US"),
      yAxis: Math.round(os.freememPercentage() * 100),
    });

    os.cpuFree((value) => {
      client.emit("cpuFree", {
        xAxis: new Date().toLocaleString("en-US"),
        yAxis: Math.round(value * 100),
      });
    });
  }, updateInterval);
});

ws.on("end", function () {
  ws.disconnect(0);
});

httpServer.listen(3333);
