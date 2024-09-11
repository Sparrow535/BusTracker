const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  route: { type: String, required: true },
  currentLocation: {
    latitude: { type: Number, required: true, default: 0 },
    longitude: { type: Number, required: true, default: 0 },
  },
});

module.exports = mongoose.model("Bus", busSchema);
