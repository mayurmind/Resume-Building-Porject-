import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Cpu, Layers } from "lucide-react";

function ResumePreview({ data }) {
  const { personal, summary, education, skills, experience, projects } = data;

  return (
    <div className="preview-paper-wrapper">
      <div className="preview-paper-a4" id="resume-preview">
        {/* Header Block */}
        <header className="resume-preview-header">
          <h1 className="preview-name">{personal.name || "Your Name"}</h1>
          <p className="preview-subtitle">{experience[0]?.role || "Profession / Title"}</p>
          
          <div className="preview-contact-grid">
            {personal.email && (
              <span className="contact-item">
                <Mail size={12} /> {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="contact-item">
                <Phone size={12} /> {personal.phone}
              </span>
            )}
            {personal.location && (
              <span className="contact-item">
                <MapPin size={12} /> {personal.location}
              </span>
            )}
            {personal.linkedin && (
              <span className="contact-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                {personal.linkedin}
              </span>
            )}
            {personal.portfolio && (
              <span className="contact-item">
                <Globe size={12} /> {personal.portfolio}
              </span>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {summary && (
          <section className="resume-preview-section">
            <h2 className="section-title">
              Professional Summary
            </h2>
            <p className="preview-summary-text">{summary}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
          <section className="resume-preview-section">
            <h2 className="section-title">
              <Briefcase size={14} /> Professional Experience
            </h2>
            <div className="experience-list">
              {experience.map((exp, index) => {
                if (!exp.company && !exp.role) return null;
                return (
                  <div key={index} className="experience-preview-item">
                    <div className="item-header">
                      <h3 className="item-title">{exp.role || "Job Title"}</h3>
                      <span className="item-date">{exp.duration || "Dates"}</span>
                    </div>
                    <div className="item-subheader">{exp.company || "Company Name"}</div>
                    {exp.description && <p className="item-desc">{exp.description}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && projects.some(proj => proj.name) && (
          <section className="resume-preview-section">
            <h2 className="section-title">
              <Layers size={14} /> Projects
            </h2>
            <div className="projects-list">
              {projects.map((proj, index) => {
                if (!proj.name) return null;
                return (
                  <div key={index} className="project-preview-item">
                    <div className="item-header">
                      <h3 className="item-title">
                        {proj.name}
                        {proj.tech && <span className="project-tech-badge"> {proj.tech}</span>}
                      </h3>
                    </div>
                    {proj.description && <p className="item-desc">{proj.description}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && education.some(edu => edu.college || edu.degree) && (
          <section className="resume-preview-section">
            <h2 className="section-title">
              <GraduationCap size={14} /> Education
            </h2>
            <div className="education-list">
              {education.map((edu, index) => {
                if (!edu.college && !edu.degree) return null;
                return (
                  <div key={index} className="education-preview-item">
                    <div className="item-header">
                      <h3 className="item-title">{edu.degree || "Degree"}</h3>
                      <span className="item-date">{edu.year || "Year"}</span>
                    </div>
                    <div className="item-subheader">{edu.college || "College/University"}</div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section className="resume-preview-section">
            <h2 className="section-title">
              <Cpu size={14} /> Skills
            </h2>
            <div className="skills-preview-tags">
              {skills.map((skill, index) => (
                <span key={index} className="preview-skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
