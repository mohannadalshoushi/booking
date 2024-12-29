const express = require("express");
const { createBooking } = require("../Controllers/bookingController");
const Booking = require("../models/Booking");
const { validateBooking } = require("../validators/bookingValidator");
const router = express.Router();

router.post("/", validateBooking, createBooking);
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log();
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
