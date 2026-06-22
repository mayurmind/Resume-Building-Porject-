import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Cpu, Layers } from "lucide-react";

const StandardTemplate = ({ data }) => {
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
};

const GoogleExpertTemplate = ({ data }) => {
  const { personal, summary, education, skills, experience, projects } = data;
  
  return (
    <div className="preview-paper-wrapper">
      <div className="preview-paper-a4 google-expert-template" id="resume-preview">
        {/* Honeycomb Background via CSS */}
        
        {/* Header Block */}
        <header className="ge-header">
          <h1 className="ge-name">{personal.name ? personal.name.toUpperCase() : "YOUR NAME"}</h1>
          <p className="ge-subtitle">
            Google Cloud Developer Expert | Cloud Security | AI Solutions
          </p>
          
          <div className="ge-contact-grid">
            {personal.phone && (
              <span className="ge-contact-item">
                <Phone size={10} /> {personal.phone}
              </span>
            )}
            {personal.email && (
              <span className="ge-contact-item">
                <Mail size={10} /> {personal.email}
              </span>
            )}
            {personal.linkedin && (
              <span className="ge-contact-item">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg> {personal.linkedin}
              </span>
            )}
            {personal.portfolio && (
              <span className="ge-contact-item">
                <Globe size={10} /> {personal.portfolio}
              </span>
            )}
            {personal.location && (
              <span className="ge-contact-item">
                <MapPin size={10} /> {personal.location}
              </span>
            )}
          </div>
        </header>

        {/* Two Column Layout */}
        <div className="ge-body-columns">
          {/* Left Column */}
          <div className="ge-left-col">
            {summary && (
              <section className="ge-section">
                <h2 className="ge-section-title">SUMMARY</h2>
                <div className="ge-section-line"></div>
                <p className="ge-summary-text">{summary}</p>
              </section>
            )}

            {experience && experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
              <section className="ge-section">
                <h2 className="ge-section-title">EXPERIENCE</h2>
                <div className="ge-section-line"></div>
                <div className="ge-experience-list">
                  {experience.map((exp, index) => {
                    if (!exp.company && !exp.role) return null;
                    return (
                      <div key={index} className="ge-experience-item">
                        <h3 className="ge-exp-role">{exp.role || "Job Title"}</h3>
                        <div className="ge-exp-company">{exp.company || "Company Name"}</div>
                        <div className="ge-exp-meta">
                          <span className="ge-exp-date"><Briefcase size={10} style={{marginRight: 4}}/> {exp.duration || "Dates"}</span>
                          <span className="ge-exp-location"><MapPin size={10} style={{marginRight: 4}}/> Remote</span>
                        </div>
                        {exp.description && (
                          <ul className="ge-exp-desc">
                            {exp.description.split('. ').filter(Boolean).map((sentence, i) => (
                              <li key={i}>{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="ge-right-col">
            {education && education.length > 0 && education.some(edu => edu.college || edu.degree) && (
              <section className="ge-section">
                <h2 className="ge-section-title">EDUCATION</h2>
                <div className="ge-section-line"></div>
                <div className="ge-education-list">
                  {education.map((edu, index) => {
                    if (!edu.college && !edu.degree) return null;
                    return (
                      <div key={index} className="ge-education-item">
                        <h3 className="ge-edu-degree">{edu.degree || "Degree"}</h3>
                        <div className="ge-edu-college">{edu.college || "College/University"}</div>
                        <div className="ge-edu-meta">
                          <span className="ge-edu-date"><Briefcase size={10} style={{marginRight: 4}}/> {edu.year || "Year"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {skills && skills.length > 0 && (
              <section className="ge-section">
                <h2 className="ge-section-title">LANGUAGES / SKILLS</h2>
                <div className="ge-section-line"></div>
                <div className="ge-skills-list">
                  {skills.map((skill, index) => {
                    // Randomize dot ratings for visual effect based on index to be consistent
                    const rating = 5 - (index % 3); 
                    return (
                      <div key={index} className="ge-skill-item">
                        <div className="ge-skill-info">
                          <span className="ge-skill-name">{skill}</span>
                          <span className="ge-skill-level">{rating >= 4 ? 'Native' : 'Advanced'}</span>
                        </div>
                        <div className="ge-skill-dots">
                          {[1, 2, 3, 4, 5].map(dot => (
                            <span key={dot} className={`ge-dot ${dot <= rating ? 'filled' : ''}`}></span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {projects && projects.length > 0 && projects.some(proj => proj.name) && (
              <section className="ge-section">
                <h2 className="ge-section-title">PROJECTS</h2>
                <div className="ge-section-line"></div>
                <div className="ge-projects-list">
                  {projects.map((proj, index) => {
                    if (!proj.name) return null;
                    return (
                      <div key={index} className="ge-project-item">
                        <h3 className="ge-project-name">{proj.name}</h3>
                        <p className="ge-project-desc">{proj.description}</p>
                        {proj.tech && <div className="ge-project-link">https://github.com/user/{proj.tech.split(',')[0].trim().toLowerCase()}</div>}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function ResumePreview({ data }) {
  if (data?.template === "google-expert") {
    return <GoogleExpertTemplate data={data} />;
  }
  return <StandardTemplate data={data} />;
}

export default ResumePreview;
