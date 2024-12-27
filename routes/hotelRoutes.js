const express = require("express");
const { createHotel } = require("../Controllers/hotelController");
const router = express.Router();

router.post("/", createHotel);

module.exports = router;
