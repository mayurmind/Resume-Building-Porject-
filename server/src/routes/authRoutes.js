const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateProfile, changePassword } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { registerValidation, loginValidation, profileValidation, passwordValidation } = require("../middleware/validators");
const { handleValidationErrors } = require("../middleware/validationMiddleware");

router.post("/register", registerValidation, handleValidationErrors, registerUser);
router.post("/login", loginValidation, handleValidationErrors, loginUser);

router.put("/profile", protect, profileValidation, handleValidationErrors, updateProfile);
router.put("/change-password", protect, passwordValidation, handleValidationErrors, changePassword);

module.exports = router;
