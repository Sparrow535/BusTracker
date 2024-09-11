const socketIO = require("socket.io");

const setupSocket = (server) => {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;
