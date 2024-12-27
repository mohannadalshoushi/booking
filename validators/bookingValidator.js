module.exports.validateBooking = (req, res, next) => {
  const { firstName, lastName, startDate, endDate, hotelName } = req.body;

  const validHotels = ["Grand Hotel", "Paradise Inn", "Ocean View"];

  if (!firstName || firstName.length < 3)
    return res
      .status(400)
      .json({ error: "First name must be at least 3 letters." });

  if (!lastName || lastName.length < 3)
    return res
      .status(400)
      .json({ error: "Last name must be at least 3 letters." });

  if (!startDate || !endDate)
    return res.status(400).json({ error: "Start and end dates are required." });

  if (new Date(startDate) >= new Date(endDate))
    return res
      .status(400)
      .json({ error: "End date must be after start date." });
  ``;

  if (!validHotels.includes(hotelName))
    return res.status(400).json({ error: "Hotel name must be valid." });

  next();
};
