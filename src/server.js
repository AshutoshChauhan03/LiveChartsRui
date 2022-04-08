const httpServer = require("http").createServer();
const os = require("os-utils");

const ws = require("socket.io")(httpServer, {
  transports: ["websocket", "polling"],
});

ws.on("connection", (client) => {
  setInterval(() => {
    os.cpuUsage((percentage) => {
      client.emit("cpu", {
        second: new Date().getSeconds(),
        value: Math.round(percentage * 100),
      });
    });

    client.emit("free", {
      second: new Date().getSeconds(),
      value: Math.round(os.freememPercentage() * 100),
    });

    os.cpuFree((value) => {
      client.emit("cpuFree", {
        second: new Date().getSeconds(),
        value: Math.round(value * 100),
      });
    });
  }, 1000);
});

httpServer.listen(3333);
