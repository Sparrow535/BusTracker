const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");

router.post("/join", busController.joinBus);
router.post("/:id/location", busController.updateLocation);
router.get("/", busController.getBuses);

module.exports = router;
