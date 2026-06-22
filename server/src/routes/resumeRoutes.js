const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");
const { resumeValidation } = require("../middleware/validators");
const { handleValidationErrors } = require("../middleware/validationMiddleware");

// POST /api/resume/create
router.post("/create", protect, resumeValidation, handleValidationErrors, resumeController.createResume);

// GET /api/resume
router.get("/", protect, resumeController.getAllResumes);

// GET /api/resume/:id
router.get("/:id", protect, resumeController.getResumeById);

// PUT /api/resume/:id
router.put("/:id", protect, resumeValidation, handleValidationErrors, resumeController.updateResume);

// DELETE /api/resume/:id
router.delete("/:id", protect, resumeController.deleteResume);

module.exports = router;
