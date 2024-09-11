const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const busRoutes = require("./routes/busRoutes");
const connectDB = require("./config/db");
const setupSocket = require("./config/socketconfig");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/buses", busRoutes);

// Socket events
require("./sockets/socketEvents")(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
