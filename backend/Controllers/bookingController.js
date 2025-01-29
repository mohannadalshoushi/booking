const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

const capitalizeFirstAndLowerLast = (name) => {
  if (!name) return "";
  const firstChar = name[0].toUpperCase();
  const middle = name.slice(1, -1);
  const lastChar = name[name.length - 1].toLowerCase();
  return `${firstChar}${middle}${lastChar}`;
};

exports.createBooking = async (req, res) => {
  try {
    const { firstName, lastName, startDate, endDate, hotelName } = req.body;

    const updatedFirstName = capitalizeFirstAndLowerLast(firstName);
    const updatedLastName = capitalizeFirstAndLowerLast(lastName);

    // Verify if the hotel exists
    const hotel = await Hotel.findOne({ where: { name: hotelName } });
    if (!hotel) {
      return res.status(400).json({ error: "Invalid hotel name." });
    }

    if (hotel.status === "booked") {
      return res.status(400).json({ error: "Hotel is already booked." });
    }

    // Calculate days of stay
    const days =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24); //1,000 milliseconds * 60 seconds * 60 minutes * 24 hours

    // Create the booking
    const newBooking = await Booking.create({
      userId: Math.floor(Math.random() * 1000), // Simulate user ID
      hotelId: hotel.id,
      startDate,
      endDate,
    });

    // Update hotel status to booked
    await hotel.update({ status: "booked" });

    res.status(201).json({
      userId: newBooking.userId,
      user: `${updatedFirstName} ${updatedLastName ?? "unknown"}`,
      hotel: hotelName,
      bookingStartDate: startDate,
      bookingEndDate: endDate,
      bookingCreatedDate: newBooking.createdAt,
      days,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  