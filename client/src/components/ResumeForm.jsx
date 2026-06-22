import { useState } from "react";
import { User, FileText, GraduationCap, Cpu, Briefcase, Code, Plus, Trash2, ChevronDown, ChevronUp, Save, Settings } from "lucide-react";
import API from "../services/api";

function ResumeForm({
  id,
  data,
  onTitleChange,
  onTemplateChange,
  onPersonalChange,
  onSummaryChange,
  onEducationChange,
  onAddEducation,
  onRemoveEducation,
  onSkillAdd,
  onSkillRemove,
  onExperienceChange,
  onAddExperience,
  onRemoveExperience,
  onProjectChange,
  onAddProject,
  onRemoveProject
}) {
  const [activeSection, setActiveSection] = useState("general");
  const [skillInput, setSkillInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Map personal to personalInfo for the backend schema expectation
      const payload = {
        title: data.title,
        template: data.template,
        personalInfo: {
          name: data.personal.name,
          email: data.personal.email,
          phone: data.personal.phone,
          location: data.personal.location,
          linkedin: data.personal.linkedin,
          portfolio: data.personal.portfolio
        },
        education: data.education,
        skills: data.skills,
        experience: data.experience,
        projects: data.projects
      };
      
      let response;
      if (id) {
        response = await API.put(`/resume/${id}`, payload);
        console.log("Updated MongoDB document:", response.data);
        alert("Resume Updated Successfully");
      } else {
        response = await API.post("/resume/create", payload);
        console.log("Returned MongoDB document:", response.data);
        alert("Resume Saved Successfully");
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || error.response?.data?.message || error.message;
      console.error("Save Error:", errMsg);
      alert("Error saving resume: " + errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = skillInput.trim();
      if (val && !data.skills.includes(val)) {
        onSkillAdd(val);
        setSkillInput("");
      }
    }
  };

  return (
    <div className="resume-form-container">
      {/* 0. General Settings (Title & Template Selection) */}
      <div className={`form-section-accordion ${activeSection === "general" ? "open" : ""}`}>
        <div className="accordion-header" onClick={() => toggleSection("general")}>
          <div className="header-left">
            <Settings size={20} />
            <span>General Settings</span>
          </div>
          {activeSection === "general" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {activeSection === "general" && (
          <div className="accordion-content">
            <div className="form-grid">
              <div className="input-group">
                <label>Resume Title</label>
                <input 
                  type="text" 
                  value={data.title || ""} 
                  onChange={(e) => onTitleChange(e.target.value)} 
                  placeholder="My Software Engineer Resume"
                />
              </div>
              <div className="input-group">
                <label>Template Layout</label>
                <select 
                  value={data.template || "modern"} 
                  onChange={(e) => onTemplateChange(e.target.value)}
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "8px",
                    padding: "10px 16px",
                    color: "white",
                    fontSize: "14px",
                    width: "100%",
                    outline: "none"
                  }}
                >
                  <option value="modern" style={{ background: "var(--bg-secondary)", color: "white" }}>Modern</option>
                  <option value="professional" style={{ background: "var(--bg-secondary)", color: "white" }}>Professional</option>
                  <option value="minimal" style={{ background: "var(--bg-secondary)", color: "white" }}>Minimal</option>
                  <option value="creative" style={{ background: "var(--bg-secondary)", color: "white" }}>Creative</option>
                  <option value="ats-friendly" style={{ background: "var(--bg-secondary)", color: "white" }}>ATS Friendly</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1. Personal Information */}
      <div className={`form-section-accordion ${activeSection === "personal" ? "open" : ""}`}>
        <div className="accordion-header" onClick={() => toggleSection("personal")}>
          <div className="header-left">
            <User size={20} />
            <span>Personal Information</span>
          </div>
          {activeSection === "personal" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {activeSection === "personal" && (
          <div className="accordion-content">
            <div className="form-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={data.personal.name || ""} 
                  onChange={(e) => onPersonalChange("name", e.target.value)} 
                  placeholder="Jane Doe"
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={data.personal.email || ""} 
                  onChange={(e) => onPersonalChange("email", e.target.value)} 
                  placeholder="jane.doe@example.com"
                />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input 
                  type="tel" 
                  value={data.personal.phone || ""} 
                  onChange={(e) => onPersonalChange("phone", e.target.value)} 
                  placeholder="+1 (555) 019-2834"
                />
              </div>
              <div className="input-group">
                <label>Location</label>
                <input 
                  type="text" 
                  value={data.personal.location || ""} 
                  onChange={(e) => onPersonalChange("location", e.target.value)} 
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="input-group">
                <label>LinkedIn</label>
                <input 
                  type="text" 
                  value={data.personal.linkedin || ""} 
                  onChange={(e) => onPersonalChange("linkedin", e.target.value)} 
                  placeholder="linkedin.com/in/janedoe"
                />
              </div>
              <div className="input-group">
                <label>Portfolio</label>
                <input 
                  type="text" 
                  value={data.personal.portfolio || ""} 
                  onChange={(e) => onPersonalChange("portfolio", e.target.value)} 
                  placeholder="janedoe.dev"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Professional Summary */}
      <div className={`form-section-accordion ${activeSection === "summary" ? "open" : ""}`}>
        <div className="accordion-header" onClick={() => toggleSection("summary")}>
          <div className="header-left">
            <FileText size={20} />
            <span>Professional Summary</span>
          </div>
          {activeSection === "summary" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {activeSection === "summary" && (
          <div className="accordion-content">
            <div className="input-group">
              <label>Brief overview of your career and skills</label>
              <textarea 
                rows="4" 
                value={data.summary || ""} 
                onChange={(e) => onSummaryChange(e.target.value)} 
                placeholder="Passionate Senior Software Architect with 5+ years of experience leading cross-functional teams..."
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Education */}
      <div className={`form-section-accordion ${activeSection === "education" ? "open" : ""}`}>
        <div className="accordion-header" onClick={() => toggleSection("education")}>
          <div className="header-left">
            <GraduationCap size={20} />
            <span>Education</span>
          </div>
          {activeSection === "education" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {activeSection === "education" && (
          <div className="accordion-content">
            {data.education.map((edu, index) => (
              <div key={index} className="repeatable-block">
                <div className="repeatable-header">
                  <span>Education #{index + 1}</span>
                  {data.education.length > 1 && (
                    <button className="delete-btn" onClick={() => onRemoveEducation(index)} title="Remove Education">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Degree</label>
                    <input 
                      type="text" 
                      value={edu.degree || ""} 
                      onChange={(e) => onEducationChange(index, "degree", e.target.value)} 
                      placeholder="B.S. Computer Science"
                    />
                  </div>
                  <div className="input-group">
                    <label>College/University</label>
                    <input 
                      type="text" 
                      value={edu.college || ""} 
                      onChange={(e) => onEducationChange(index, "college", e.target.value)} 
                      placeholder="Stanford University"
                    />
                  </div>
                  <div className="input-group">
                    <label>Graduation Year</label>
                    <input 
                      type="text" 
                      value={edu.year || ""} 
                      onChange={(e) => onEducationChange(index, "year", e.target.value)} 
                      placeholder="2021"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={onAddEducation}>
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* 4. Skills */}
      <div className={`form-section-accordion ${activeSection === "skills" ? "open" : ""}`}>
        <div className="accordion-header" onClick={() => toggleSection("skills")}>
          <div className="header-left">
            <Cpu size={20} />
            <span>Skills</span>
          </div>
          {activeSection === "skills" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {activeSection === "skills" && (
          <div className="accordion-content">
            <div className="input-group">
              <label>Add Skills (Press Enter or comma to add)</label>
              <input 
                type="text" 
                value={skillInput} 
                onChange={(e) => setSkillInput(e.target.value)} 
                onKeyDown={handleSkillKeyDown}
                placeholder="React, CSS, Node.js..."
              />
            </div>
            <div className="tags-container">
              {data.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button className="remove-tag" onClick={() => onSkillRemove(index)}>
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Experience */}
      <div className={`form-section-accordion ${activeSection === "experience" ? "open" : ""}`}>
        <div className="accordion-header" onClick={() => toggleSection("experience")}>
          <div className="header-left">
            <Briefcase size={20} />
            <span>Experience</span>
          </div>
          {activeSection === "experience" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {activeSection === "experience" && (
          <div className="accordion-content">
            {data.experience.map((exp, index) => (
              <div key={index} className="repeatable-block">
                <div className="repeatable-header">
                  <span>Experience #{index + 1}</span>
                  {data.experience.length > 1 && (
                    <button className="delete-btn" onClick={() => onRemoveExperience(index)} title="Remove Experience">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Company</label>
                    <input 
                      type="text" 
                      value={exp.company || ""} 
                      onChange={(e) => onExperienceChange(index, "company", e.target.value)} 
                      placeholder="TechCorp Solutions"
                    />
                  </div>
                  <div className="input-group">
                    <label>Role</label>
                    <input 
                      type="text" 
                      value={exp.role || ""} 
                      onChange={(e) => onExperienceChange(index, "role", e.target.value)} 
                      placeholder="Lead Frontend Engineer"
                    />
                  </div>
                  <div className="input-group">
                    <label>Duration</label>
                    <input 
                      type="text" 
                      value={exp.duration || ""} 
                      onChange={(e) => onExperienceChange(index, "duration", e.target.value)} 
                      placeholder="2023 - Present"
                    />
                  </div>
                </div>
                <div className="input-group" style={{ marginTop: "12px" }}>
                  <label>Description</label>
                  <textarea 
                    rows="3" 
                    value={exp.description || ""} 
                    onChange={(e) => onExperienceChange(index, "description", e.target.value)} 
                    placeholder="Led development of interactive interfaces, improving page speeds by 30%..."
                  />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={onAddExperience}>
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* 6. Projects */}
      <div className={`form-section-accordion ${activeSection === "projects" ? "open" : ""}`}>
        <div className="accordion-header" onClick={() => toggleSection("projects")}>
          <div className="header-left">
            <Code size={20} />
            <span>Projects</span>
          </div>
          {activeSection === "projects" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {activeSection === "projects" && (
          <div className="accordion-content">
            {data.projects.map((proj, index) => (
              <div key={index} className="repeatable-block">
                <div className="repeatable-header">
                  <span>Project #{index + 1}</span>
                  {data.projects.length > 1 && (
                    <button className="delete-btn" onClick={() => onRemoveProject(index)} title="Remove Project">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Project Name</label>
                    <input 
                      type="text" 
                      value={proj.name || ""} 
                      onChange={(e) => onProjectChange(index, "name", e.target.value)} 
                      placeholder="E-Commerce Analytics Platform"
                    />
                  </div>
                  <div className="input-group">
                    <label>Tech Stack</label>
                    <input 
                      type="text" 
                      value={proj.tech || ""} 
                      onChange={(e) => onProjectChange(index, "tech", e.target.value)} 
                      placeholder="React, Node.js, AWS"
                    />
                  </div>
                </div>
                <div className="input-group" style={{ marginTop: "12px" }}>
                  <label>Description</label>
                  <textarea 
                    rows="3" 
                    value={proj.description || ""} 
                    onChange={(e) => onProjectChange(index, "description", e.target.value)} 
                    placeholder="Built real-time visualization dashboards serving over 10k daily active users..."
                  />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={onAddProject}>
              <Plus size={16} /> Add Project
            </button>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button 
        className="ctrl-btn export" 
        onClick={handleSave} 
        disabled={isSaving}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "12px",
          marginTop: "10px",
          fontSize: "16px",
          fontWeight: "700",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        <Save size={18} />
        {id ? (isSaving ? "Updating Resume..." : "Update Resume") : (isSaving ? "Saving Resume..." : "Save Resume")}
      </button>
    </div>
  );
}

export default ResumeForm;
