const Validator = require("validator");
const isEmpty = require("./is-empty");

// This function validates the quote input (email)
module.exports = function validateQuoteInput(data) {
  let errors = {};

  // Check each field is empty, assign it an empty string for validation
  data.recipientEmail = !isEmpty(data.recipientEmail)
    ? data.recipientEmail
    : "";

  // Check if the email format is valid
  if (!Validator.isEmail(data.recipientEmail)) {
    errors.recipientEmail = "Recipient email is invalid";
  }

  // Ensure the email field is not empty
  if (Validator.isEmpty(data.recipientEmail)) {
    errors.recipientEmail = "Recipient email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
