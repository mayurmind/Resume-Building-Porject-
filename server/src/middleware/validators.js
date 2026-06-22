const { body } = require("express-validator");

// Auth validations
const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const profileValidation = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty if provided"),
  body("email").optional().isEmail().withMessage("Please include a valid email"),
];

const passwordValidation = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
];

// Resume validations
const resumeValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("personalInfo.email").optional({ checkFalsy: true }).isEmail().withMessage("Personal info email must be a valid email"),
];

module.exports = {
  registerValidation,
  loginValidation,
  profileValidation,
  passwordValidation,
  resumeValidation,
};
