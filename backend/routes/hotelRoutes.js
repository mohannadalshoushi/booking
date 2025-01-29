const express = require("express");
const { createHotel } = require("../Controllers/hotelController");
const Hotel = require("../models/Hotel");
const { where } = require("sequelize");
const router = express.Router();

// GET API to all hotels with id, name, description, and image
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.findAll({
      attributes: ["id", "name", "description", "image", "status"],
    });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const hotel = await Hotel.findOne({ where: { id: id } });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    if (!["available", "booked"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    await hotel.update({ status });
    res
      .status(200)
      .json({ message: "Hotel status updated successfully", hotel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
