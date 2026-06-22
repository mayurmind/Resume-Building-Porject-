import { Briefcase, GraduationCap, CheckCircle, Award } from "lucide-react";

function ResumeMockup() {
  return (
    <div className="hero-image">
      {/* Background glow elements */}
      <div className="mockup-glow"></div>

      {/* Floating Badges */}
      <div className="floating-badge badge-1">
        <div className="badge-icon">
          <CheckCircle size={16} />
        </div>
        <div>
          <div>ATS Friendly</div>
          <div className="badge-text-sub">Score: 98%</div>
        </div>
      </div>

      <div className="floating-badge badge-2">
        <div className="badge-icon">
          <Award size={16} />
        </div>
        <div>
          <div>PDF Exported</div>
          <div className="badge-text-sub">One-click download</div>
        </div>
      </div>

      {/* Main 3D Card */}
      <div className="mockup-container">
        <div className="resume-card">
          {/* Header Section */}
          <div className="mockup-header">
            <div className="mockup-avatar">JD</div>
            <div className="mockup-header-info">
              <div className="mockup-name">Jane Doe</div>
              <div className="mockup-title">Senior Software Architect</div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mockup-section">
            <div className="mockup-section-title">
              Skills
            </div>
            <div className="mockup-skills-grid">
              <span className="mockup-skill-tag">React</span>
              <span className="mockup-skill-tag">TypeScript</span>
              <span className="mockup-skill-tag">Node.js</span>
              <span className="mockup-skill-tag">System Design</span>
              <span className="mockup-skill-tag">GraphQL</span>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mockup-section">
            <div className="mockup-section-title">
              <Briefcase size={12} /> Experience
            </div>
            <div className="mockup-experience-item">
              <div className="mockup-job-title">Lead Frontend Engineer</div>
              <div className="mockup-company">
                <span>TechCorp Solutions</span>
                <span>2023 - Present</span>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mockup-section">
            <div className="mockup-section-title">
              <GraduationCap size={12} /> Education
            </div>
            <div className="mockup-education-item">
              <div className="mockup-degree">B.S. Computer Science</div>
              <div className="mockup-school">
                <span>Stanford University</span>
                <span>Graduated 2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeMockup;
