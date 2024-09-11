const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");

// Route to update bus location
router.post("/:id/location", busController.updateLocation);
router.get("/", busController.getBuses);
router.post("/add", busController.addBus);

module.exports = router;
