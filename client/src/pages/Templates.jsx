import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TemplateCard from "../components/TemplateCard";
import Footer from "../components/Footer";
import { Award } from "lucide-react";

function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

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
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Templates;
