const Resume = require("../models/Resume");

// 1. Create Resume
// POST: /api/resume/create
exports.createResume = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const {
      title,
      template,
      personalInfo,
      education,
      skills,
      experience,
      projects
    } = req.body || {};

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newResume = new Resume({
      userId: req.user.id,
      title,
      template,
      personalInfo,
      education,
      skills,
      experience,
      projects,
      lastUpdated: Date.now()
    });

    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// 2. Get All Resumes
// GET: /api/resume
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ lastUpdated: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// 3. Get Single Resume
// GET: /api/resume/:id
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// 4. Update Resume
// PUT: /api/resume/:id
exports.updateResume = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const {
      title,
      template,
      personalInfo,
      education,
      skills,
      experience,
      projects
    } = req.body || {};

    const updatedData = {
      title,
      template,
      personalInfo,
      education,
      skills,
      experience,
      projects,
      lastUpdated: Date.now()
    };

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// 5. Delete Resume
// DELETE: /api/resume/:id
exports.deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    
    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.status(200).json({ message: "Resume deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};
