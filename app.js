const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/bookings", bookingRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synchronized");
  app.listen(3000, () => console.log("Server is running on port 3000"));
});

module.exports = app;
