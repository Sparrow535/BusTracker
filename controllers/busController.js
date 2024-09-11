const Bus = require("../models/bus");

exports.addBus = async (req, res) => {
  const { busNumber, route } = req.body; // Get bus number and route from the request body
  if (!busNumber || !route) {
    return res.status(400).json({ error: "Missing bus number or route" });
  }

  try {
    // Create a new bus object with the provided bus number and route
    const bus = new Bus({ busNumber, route });
    await bus.save(); // Save the new bus to the database

    res.status(201).json({ message: "Bus added successfully", bus });
  } catch (error) {
    console.error("Error adding bus:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateLocation = async (req, res) => {
  const { id } = req.params; // Get the bus ID from the URL parameters
  const { latitude, longitude } = req.body; // Get latitude and longitude from the request body

  // Validate latitude and longitude
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }

  try {
    // Update the bus location
    const bus = await Bus.findByIdAndUpdate(
      id,
      {
        currentLocation: {
          latitude,
          longitude,
        },
      },
      { new: true } // Return the updated document
    );

    // Check if the bus was found and updated
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Broadcast the updated location to all connected clients
    if (req.io) {
      req.io.emit("bus location update", { id: bus._id, latitude, longitude });
    } else {
      console.error("Socket.IO instance is not available");
    }

    // Send a successful response
    res.status(200).json({ message: "Bus location updated", bus });
  } catch (error) {
    // Log the error details for debugging
    console.error("Error updating bus location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBuses = async (req, res) => {
  const buses = await Bus.find();
  res.status(200).json(buses);
};
