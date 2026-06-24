import { Eye, Edit3 } from "lucide-react";

function TemplateCard({ id, name, category, description, onUseTemplate, onPreview }) {
  // Helper to render mock representation of the template structure
  const renderTemplateMockup = () => {
    switch (id) {
      case "modern":
        return (
          <div className="template-mock modern-mock">
            <div className="mock-top-band"></div>
            <div className="mock-body">
              <div className="mock-sidebar">
                <div className="mock-line short"></div>
                <div className="mock-line"></div>
                <div className="mock-line short"></div>
              </div>
              <div className="mock-main">
                <div className="mock-block"></div>
                <div className="mock-block"></div>
              </div>
            </div>
          </div>
        );
      case "professional":
        return (
          <div className="template-mock professional-mock">
            <div className="mock-body">
              <div className="mock-main">
                <div className="mock-header-line"></div>
                <div className="mock-block"></div>
                <div className="mock-block"></div>
              </div>
              <div className="mock-sidebar right">
                <div className="mock-avatar-place"></div>
                <div className="mock-line"></div>
                <div className="mock-line"></div>
              </div>
            </div>
          </div>
        );
      case "minimal":
        return (
          <div className="template-mock minimal-mock">
            <div className="mock-center-header">
              <div className="mock-avatar-place center"></div>
              <div className="mock-line short center"></div>
            </div>
            <div className="mock-body-full">
              <div className="mock-line"></div>
              <div className="mock-line"></div>
              <div className="mock-line"></div>
            </div>
          </div>
        );
      case "creative":
        return (
          <div className="template-mock creative-mock">
            <div className="mock-fancy-header">
              <div className="mock-circle-accent"></div>
            </div>
            <div className="mock-body-split">
              <div className="mock-column">
                <div className="mock-card-place"></div>
                <div className="mock-card-place"></div>
              </div>
              <div className="mock-column">
                <div className="mock-card-place"></div>
                <div className="mock-card-place"></div>
              </div>
            </div>
          </div>
        );
      case "google-expert":
        return (
          <div className="template-mock professional-mock">
            <div className="mock-body" style={{ flexDirection: "column" }}>
              <div className="mock-header-line" style={{ width: "100%", height: "20px" }}></div>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <div className="mock-main" style={{ width: "60%" }}>
                  <div className="mock-block"></div>
                  <div className="mock-block"></div>
                </div>
                <div className="mock-sidebar right" style={{ width: "40%" }}>
                  <div className="mock-block"></div>
                  <div className="mock-block"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "google-cloud":
        return (
          <div className="template-mock professional-mock">
            <div className="mock-body" style={{ flexDirection: "column" }}>
              <div className="mock-header-line" style={{ width: "100%", height: "20px", background: "var(--color-primary)" }}></div>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <div className="mock-main" style={{ width: "50%" }}>
                  <div className="mock-block"></div>
                  <div className="mock-block"></div>
                </div>
                <div className="mock-sidebar right" style={{ width: "50%" }}>
                  <div className="mock-block"></div>
                  <div className="mock-block"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "ats-friendly":
      default:
        return (
          <div className="template-mock ats-mock">
            <div className="mock-body-full font-serif">
              <div className="mock-line bold"></div>
              <div className="mock-line-group">
                <div className="mock-line short"></div>
                <div className="mock-line"></div>
              </div>
              <div className="mock-line-group">
                <div className="mock-line short"></div>
                <div className="mock-line"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="template-card">
      <div className="template-preview-area">
        {renderTemplateMockup()}
        <div className="template-card-overlay">
          <button className="preview-btn-overlay" title="Preview Template" onClick={(e) => { e.stopPropagation(); onPreview && onPreview(id); }}>
            <Eye size={18} />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <div className="template-info">
        <div className="template-meta">
          <span className="template-badge">{category}</span>
        </div>
        <h3 className="template-name">{name}</h3>
        <p className="template-desc">{description}</p>
        
        <div className="template-actions">
          <button className="template-btn primary" onClick={() => onUseTemplate(id)}>
            <Edit3 size={15} />
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard;
