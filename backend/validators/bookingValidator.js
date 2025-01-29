const { checkSchema, validationResult } = require("express-validator");

const validHotels = [
  "Grand Hotel",
  "Paradise Inn",
  "Ocean View",
  "Amman Grand Hotel",
];

module.exports.validateBooking = checkSchema({
  firstName: {
    notEmpty: {
      errorMessage: "First name is required.",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "First name must be at least 3 letters.",
    },
    customSanitizer: {
      options: (value) => value,
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: "Last name is required.",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Last name must be at least 3 letters.",
    },
    customSanitizer: {
      options: (value) =>
        value?.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase(),
    },
  },
  startDate: {
    notEmpty: {
      errorMessage: "Start date is required.",
    },
    isISO8601: {
      errorMessage: "Start date must be a valid date.",
    },
  },
  endDate: {
    notEmpty: {
      errorMessage: "End date is required.",
    },
    isISO8601: {
      errorMessage: "End date must be a valid date.",
    },
    custom: {
      options: (value, { req }) => {
        if (new Date(req.body.startDate) >= new Date(value)) {
          throw new Error("End date must be after start date.");
        }
        return true;
      },
    },
  },
  hotelName: {
    notEmpty: {
      errorMessage: "Hotel name is required.",
    },
    custom: {
      options: (value) => {
        if (!validHotels.includes(value)) {
          throw new Error("Hotel name must be valid.");
        }
        return true;
      },
    },
  },
});

module.exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
