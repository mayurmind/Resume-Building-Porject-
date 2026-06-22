const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    template: {
      type: String,
      required: true,
      default: "Modern"
    },
    personalInfo: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      portfolio: { type: String, default: "" }
    },
    education: [
      {
        degree: { type: String, default: "" },
        college: { type: String, default: "" },
        year: { type: String, default: "" }
      }
    ],
    skills: {
      type: [String],
      default: []
    },
    experience: [
      {
        company: { type: String, default: "" },
        role: { type: String, default: "" },
        duration: { type: String, default: "" },
        description: { type: String, default: "" }
      }
    ],
    projects: [
      {
        name: { type: String, default: "" },
        tech: { type: String, default: "" },
        description: { type: String, default: "" }
      }
    ],
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Resume", ResumeSchema);
