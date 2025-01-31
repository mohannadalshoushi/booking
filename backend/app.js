const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const bookingRoutes = require("./routes/bookingRoutes");
const hotelRoutes = require("./routes/hotelRoutes"); // Add this line
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/bookings", bookingRoutes);
app.use("/hotels", hotelRoutes); // Add this line

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synchronized");
  app.listen(3000, () => console.log("Server is running on port 3000"));
});

module.exports = app;
