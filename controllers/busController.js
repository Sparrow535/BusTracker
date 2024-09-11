const Bus = require("../models/bus");

exports.updateLocation = async (req, res) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;

  // Find the bus by ID
  const bus = await Bus.findById(id);

  if (!bus) {
    return res.status(404).json({ error: "Bus not found" });
  }

  // Update the bus location
  bus.currentLocation = {
    latitude,
    longitude,
    updatedAt: new Date(),
  };

  await bus.save();

  // Broadcast the updated location to all connected clients
  req.io.emit("bus location update", { id: bus._id, latitude, longitude });

  res.status(200).json({ message: "Bus location updated", bus });
};

exports.getBuses = async (req, res) => {
  const buses = await Bus.find();
  res.status(200).json(buses);
};
