const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract the first error message to keep compatibility with existing frontend expectations
    const errorMessage = errors.array()[0].msg;
    return res.status(400).json({ message: errorMessage });
  }
  next();
};

module.exports = {
  handleValidationErrors
};
