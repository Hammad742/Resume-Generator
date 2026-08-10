
const FresherTemplate = ({ data, formatUrl }) => {
  return (
    <div className="template-fresher">
      {/* Header */}
      <header>
        <div className="header-content">
          <h1>{data.personal.fullName}</h1>
          <p className="title">{data.personal.title}</p>
          <div className="contact-info">
            <div className="contact-row">
              <a href={`mailto:${data.personal.email}`}>{data.personal.email}</a>
              <span>•</span>
              <span>{data.personal.phone}</span>
              <span>•</span>
              <span>{data.personal.address}</span>
            </div>
            {(data.personal.linkedin || data.personal.github || data.personal.portfolio) && (
              <div className="contact-row">
                {[
                  data.personal.linkedin && <a key="li" href={formatUrl(data.personal.linkedin)} target="_blank" rel="noopener noreferrer">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a>,
                  data.personal.github && <a key="gh" href={formatUrl(data.personal.github)} target="_blank" rel="noopener noreferrer">{data.personal.github.replace(/^https?:\/\//, '')}</a>,
                  data.personal.portfolio && <a key="pf" href={formatUrl(data.personal.portfolio)} target="_blank" rel="noopener noreferrer">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a>
                ].filter(Boolean).reduce((prev, curr, i) => [prev, <span key={`sep-${i}`}> • </span>, curr])}
              </div>
            )}
          </div>
        </div>
        {data.showProfilePhoto && data.personal.photo && (
          <img src={data.personal.photo} alt="Profile" className="profile-img" />
        )}
      </header>

      {/* Summary */}
      {data.personal.summary && (
        <section className="no-split">
          <h2>Professional Summary</h2>
          <p className="summary">{data.personal.summary}</p>
        </section>
      )}

      {/* Skills (Moved up for Freshers) */}
      {data.sectionVisibility.skills && data.skills.length > 0 && (
        <section className="skills-section no-split">
          <h2>Skills</h2>
          <div className="skills-container">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Projects (Moved up for Freshers) */}
      {data.sectionVisibility.projects && data.projects.length > 0 && (
        <section>
          <h2>Key Projects</h2>
          <div className="projects-grid">
            {data.projects.map((project) => (
              <div key={project.id} className="item project-card">
                <div className="item-header">
                  <h3>{project.name}</h3>
                  {project.link && (
                    <a href={formatUrl(project.link)} target="_blank" rel="noopener noreferrer" className="project-link">
                      Link
                    </a>
                  )}
                </div>
                <p className="description">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.sectionVisibility.certificates && data.certificates.length > 0 && (
        <section>
          <h2>Certifications</h2>
          {data.certificates.map((cert) => (
            <div key={cert.id} className="item certificate-item">
              <div className="item-header">
                <h3>{cert.name}</h3>
                <span>{cert.year}</span>
              </div>
              <p className="organization">{cert.organization}</p>
              <p className="description">{cert.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.sectionVisibility.education && data.education.length > 0 && (
        <section>
          <h2>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="item education-item">
              <div className="item-header">
                <h3>{edu.degree}</h3>
                <span>{edu.year}</span>
              </div>
              <p className="school">{edu.school}</p>
              {edu.percentage && <p className="result">Grade: {edu.percentage}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {data.sectionVisibility.experience && data.experience.length > 0 && (
        <section>
          <h2>Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="item experience-item">
              <div className="item-header">
                <h3>{exp.position}</h3>
                <span>{exp.duration}</span>
              </div>
              <p className="company">{exp.company}</p>
              <p className="description">{exp.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default FresherTemplate;
