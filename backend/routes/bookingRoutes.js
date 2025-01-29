const express = require("express");
const { createBooking } = require("../Controllers/bookingController");
const Booking = require("../models/Booking");
const {
  validateBooking,
  handleValidationErrors,
} = require("../validators/bookingValidator");

const router = express.Router();

router.post("/", validateBooking, handleValidationErrors, createBooking);

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bookings = await Booking.findAll({ where: { userId: id } });
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
