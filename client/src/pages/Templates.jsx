import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TemplateCard from "../components/TemplateCard";
import Footer from "../components/Footer";
import ResumePreview from "../components/ResumePreview";
import { Award, X } from "lucide-react";

function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const navigate = useNavigate();

  // Sample data to show in preview modal
  const SAMPLE_DATA = {
    title: "Sample Resume",
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
    skills: ["React", "TypeScript", "Node.js", "System Design", "AWS"],
    experience: [
      {
        company: "TechCorp Solutions",
        role: "Lead Frontend Engineer",
        duration: "2023 - Present",
        description: "Led development of interactive interfaces, improving page loading speeds by 30% and coordinating a team of 6 engineers."
      }
    ],
    projects: [
      {
        name: "E-Commerce Analytics Platform",
        tech: "React, Node.js",
        description: "Built real-time visualization dashboards serving over 10,000 daily active users."
      }
    ]
  };

  const templatesData = [
    {
      id: "modern",
      name: "Modern Design",
      category: "Other Companies",
      description: "Clean side-column hierarchy with colored accent headers. Best for tech and startup roles."
    },
    {
      id: "professional",
      name: "Executive Professional",
      category: "Other Companies",
      description: "Structured split layouts with high readability. Designed for managers and executives."
    },
    {
      id: "minimal",
      name: "Minimalist Elegance",
      category: "Other Companies",
      description: "Centered sleek headers and generous whitespace. Elegant look for writers and researchers."
    },
    {
      id: "creative",
      name: "Creative Spark",
      category: "Other Companies",
      description: "Bold highlights and grid blocks. Fits designers, marketers, and creative fields."
    },
    {
      id: "google-expert",
      name: "Google Developer Expert",
      category: "Google",
      description: "Two-column layout with a top header and honeycomb background, inspired by Google Developer Experts."
    },
    {
      id: "google-cloud",
      name: "Google Cloud Engineer",
      category: "Google",
      description: "Clean two-column layout with blue accents and key achievement highlights. Perfect for cloud engineers."
    },
    {
      id: "ats-friendly",
      name: "ATS Optimized Plain",
      category: "Other Companies",
      description: "Classic layout focusing purely on standard fonts and structures. Matches automatic scanner guidelines."
    }
  ];

  const categories = ["All", "Google", "Microsoft", "Other Companies"];

  const filteredTemplates = selectedCategory === "All" 
    ? templatesData 
    : templatesData.filter(t => t.category === selectedCategory);

  return (
    <div className="templates-page">
      <Navbar />

      <section className="templates-hero">
        <div className="templates-hero-content">
          <div className="hero-badge">
            <Award size={14} style={{ color: "var(--color-primary)" }} />
            Recruiter Approved Designs
          </div>
          <h1>Choose Your Resume Template</h1>
          <p>
            Select a professional design and start building your career profile. Each template is engineered to meet industry guidelines.
          </p>
        </div>
      </section>

      <section className="templates-section">
        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="templates-grid">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              category={template.category}
              description={template.description}
              onUseTemplate={(id) => navigate(`/editor?template=${id}`)}
              onPreview={(id) => setPreviewTemplate(id)}
            />
          ))}
        </div>
      </section>

      {/* Full Screen Modal Preview */}
      {previewTemplate && (
        <div 
          className="modal-overlay" 
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000, padding: "40px" }} 
          onClick={() => setPreviewTemplate(null)}
        >
          <div 
            style={{ position: "relative", width: "100%", maxWidth: "900px", maxHeight: "90vh", overflowY: "auto", backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "30px", border: "1px solid var(--glass-border)", display: "flex", flexDirection: "column", alignItems: "center" }} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              style={{ position: "absolute", top: "15px", right: "15px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "8px", borderRadius: "50%", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }} 
              onClick={() => setPreviewTemplate(null)}
              onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
            >
              <X size={20} />
            </button>
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Template Preview</h3>
              <p style={{ color: "var(--color-text-muted)" }}>This is how your resume will look with this template.</p>
            </div>
            
            <div style={{ transform: "scale(0.85)", transformOrigin: "top center", marginBottom: "-80px" }}>
              <ResumePreview data={{ ...SAMPLE_DATA, template: previewTemplate }} />
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", paddingBottom: "20px", position: "relative", zIndex: 5 }}>
              <button 
                className="btn-primary" 
                onClick={() => navigate(`/editor?template=${previewTemplate}`)}
                style={{ padding: "14px 30px", fontSize: "16px" }}
              >
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Templates;
