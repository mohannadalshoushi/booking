const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Hotel = sequelize.define("Hotel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("available", "booked"),
    defaultValue: "available",
  },
});

module.exports = Hotel;
