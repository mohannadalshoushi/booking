module.exports.validateBooking = (req, res, next) => {
  const { firstName, lastName, startDate, endDate, hotelName } = req.body;

  const validHotels = [
    "Grand Hotel",
    "Paradise Inn",
    "Ocean View",
    "Amman Grand Hotel",
  ];
  if (!firstName || firstName.length < 3)
    return res
      .status(400)
      .json({ error: "First name must be at least 3 letters." });
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  if (!lastName) {
    return res.status(400).json({ error: "please enter your last name" });
  }
  if (lastName.length < 3) {
    return res
      .status(400)
      .json({ error: "Last name must be at least 3 letters." });
  }

  if (!startDate || !endDate)
    return res.status(400).json({ error: "Start and end dates are required." });

  if (new Date(startDate) >= new Date(endDate))
    return res
      .status(400)
      .json({ error: "End date must be after start date." });
  ``;

  if (!validHotels.includes(hotelName))
    return res.status(400).json({ error: "Hotel name must be valid." });

  req.body.firstName = formattedFirstName;
  next();
};
