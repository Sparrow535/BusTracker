const Bus = require("../models/bus");

const setupSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("update location", async (data) => {
      const { id, latitude, longitude } = data;
      try {
        await Bus.findByIdAndUpdate(id, {
          currentLocation: { latitude, longitude },
        });
        io.emit("bus location update", { id, latitude, longitude });
      } catch (error) {
        console.error("Error updating bus location via socket:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
};

module.exports = setupSocketEvents;
