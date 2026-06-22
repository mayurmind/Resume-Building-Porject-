import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import Footer from "../components/Footer";
import { RotateCcw } from "lucide-react";
import API from "../services/api";
import ExportPDF from "../components/ExportPDF";
import Loader from "../components/Loader";

const INITIAL_DATA = {
  title: "My Software Engineer Resume",
  template: "modern",
  personal: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/janedoe",
    portfolio: "janedoe.dev"
  },
  summary: "Senior Software Architect with 5+ years of experience leading cross-functional teams in building scalable cloud web applications. Expert in React, Node.js, and high-performance frontend interfaces.",
  education: [
    { degree: "B.S. Computer Science", college: "Stanford University", year: "2021" }
  ],
  skills: ["React", "TypeScript", "Node.js", "System Design", "GraphQL", "CSS Grid", "AWS"],
  experience: [
    {
      company: "TechCorp Solutions",
      role: "Lead Frontend Engineer",
      duration: "2023 - Present",
      description: "Led development of interactive interfaces, improving page loading speeds by 30% and coordinating a team of 6 engineers to build the core analytics dashboards."
    }
  ],
  projects: [
    {
      name: "E-Commerce Analytics Platform",
      tech: "React, Node.js, AWS",
      description: "Built real-time visualization dashboards serving over 10,000 daily active users with sub-second page transition latencies."
    }
  ]
};

function Editor() {
  const { id } = useParams();
  const location = useLocation();
  const [resumeData, setResumeData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (!active) return;
      if (!id) {
        const queryParams = new URLSearchParams(location.search);
        const templateParam = queryParams.get("template");
        
        setResumeData({
          ...INITIAL_DATA,
          template: templateParam || INITIAL_DATA.template
        });
        setLoading(false);
        return;
      }

      const fetchResumeDetails = async () => {
        setLoading(true);
        try {
          const response = await API.get(`/resume/${id}`);
          if (!active) return;
          const fetchedResume = response.data;
          
          // Map backend schema structures to frontend local states structure
          const formattedData = {
            title: fetchedResume.title || "Untitled Resume",
            template: fetchedResume.template || "modern",
            personal: {
              name: fetchedResume.personalInfo?.name || "",
              email: fetchedResume.personalInfo?.email || "",
              phone: fetchedResume.personalInfo?.phone || "",
              location: fetchedResume.personalInfo?.location || "",
              linkedin: fetchedResume.personalInfo?.linkedin || "",
              portfolio: fetchedResume.personalInfo?.portfolio || ""
            },
            summary: fetchedResume.summary || "",
            education: fetchedResume.education || [],
            skills: fetchedResume.skills || [],
            experience: fetchedResume.experience || [],
            projects: fetchedResume.projects || []
          };
          
          setResumeData(formattedData);
          setError(null);
        } catch (err) {
          console.error("Error fetching resume details:", err);
          setError("Failed to load resume details. Please try again.");
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      };

      fetchResumeDetails();
    });

    return () => {
      active = false;
    };
  }, [id]);

  // Form handlers
  const handleTitleChange = (value) => {
    setResumeData((prev) => ({
      ...prev,
      title: value
    }));
  };

  const handleTemplateChange = (value) => {
    setResumeData((prev) => ({
      ...prev,
      template: value
    }));
  };

  const handlePersonalChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const handleSummaryChange = (value) => {
    setResumeData((prev) => ({
      ...prev,
      summary: value
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setResumeData((prev) => {
      const updatedEdu = [...prev.education];
      updatedEdu[index] = { ...updatedEdu[index], [field]: value };
      return { ...prev, education: updatedEdu };
    });
  };

  const handleAddEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", college: "", year: "" }]
    }));
  };

  const handleRemoveEducation = (index) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSkillAdd = (newSkill) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const handleSkillRemove = (index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setResumeData((prev) => {
      const updatedExp = [...prev.experience];
      updatedExp[index] = { ...updatedExp[index], [field]: value };
      return { ...prev, experience: updatedExp };
    });
  };

  const handleAddExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", duration: "", description: "" }]
    }));
  };

  const handleRemoveExperience = (index) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setResumeData((prev) => {
      const updatedProj = [...prev.projects];
      updatedProj[index] = { ...updatedProj[index], [field]: value };
      return { ...prev, projects: updatedProj };
    });
  };

  const handleAddProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: "", tech: "", description: "" }]
    }));
  };

  const handleRemoveProject = (index) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the resume draft? All changes will be replaced with sample data.")) {
      setResumeData(INITIAL_DATA);
    }
  };

  return (
    <div className="editor-page">
      <Navbar />

      {/* Editor Main Container */}
      <div className="editor-workspace-header">
        <div className="workspace-title-area">
          <h1>Resume Editor</h1>
          <p>Complete details to view real-time changes.</p>
        </div>
        <div className="workspace-controls">
          <button className="ctrl-btn reset" onClick={handleReset} title="Reset to Sample">
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          <ExportPDF />
        </div>
      </div>

      {loading ? (
        <Loader fullScreen={true} text="Loading resume details..." />
      ) : error ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "50vh", color: "white", gap: "16px" }}>
          <p style={{ color: "var(--color-primary, #ff3366)" }}>{error}</p>
        </div>
      ) : (
        <div className="editor-workspace">
          {/* Left Side Inputs Form */}
          <div className="editor-form-col">
            <ResumeForm
              id={id}
              data={resumeData}
              onTitleChange={handleTitleChange}
              onTemplateChange={handleTemplateChange}
              onPersonalChange={handlePersonalChange}
              onSummaryChange={handleSummaryChange}
              onEducationChange={handleEducationChange}
              onAddEducation={handleAddEducation}
              onRemoveEducation={handleRemoveEducation}
              onSkillAdd={handleSkillAdd}
              onSkillRemove={handleSkillRemove}
              onExperienceChange={handleExperienceChange}
              onAddExperience={handleAddExperience}
              onRemoveExperience={handleRemoveExperience}
              onProjectChange={handleProjectChange}
              onAddProject={handleAddProject}
              onRemoveProject={handleRemoveProject}
            />
          </div>

          {/* Right Side Live A4 Mockup */}
          <div className="editor-preview-col">
            <div className="sticky-preview-container">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Editor;
