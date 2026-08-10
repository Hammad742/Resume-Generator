import React from 'react';

const CompactTemplate = ({ data, formatUrl }) => {
  return (
    <div className="template-compact">
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
        {data.showProfilePhoto && data.personal.photo && (
          <img src={data.personal.photo} alt="Profile" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
        )}
        <div className="header-text">
          <h1 style={{ textAlign: data.showProfilePhoto && data.personal.photo ? 'left' : 'center' }}>{data.personal.fullName}</h1>
          <p className="title" style={{ textAlign: data.showProfilePhoto && data.personal.photo ? 'left' : 'center' }}>{data.personal.title}</p>
          <div className="contact-info" style={{ textAlign: data.showProfilePhoto && data.personal.photo ? 'left' : 'center' }}>
            <a href={`mailto:${data.personal.email}`}>{data.personal.email}</a> | {data.personal.phone} | {data.personal.address}
            {(data.personal.linkedin || data.personal.github || data.personal.portfolio) && (
              <>
                {' | '}
                {[
                  data.personal.linkedin && <a key="li" href={formatUrl(data.personal.linkedin)} target="_blank" rel="noopener noreferrer">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a>,
                  data.personal.github && <a key="gh" href={formatUrl(data.personal.github)} target="_blank" rel="noopener noreferrer">{data.personal.github.replace(/^https?:\/\//, '')}</a>,
                  data.personal.portfolio && <a key="pf" href={formatUrl(data.personal.portfolio)} target="_blank" rel="noopener noreferrer">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a>
                ].filter(Boolean).reduce((prev, curr, i) => [prev, <span key={`sep-${i}`}> | </span>, curr])}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.personal.summary && (
        <section className="no-split">
          <h2>Professional Summary</h2>
          <p className="summary">{data.personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.sectionVisibility.experience && data.experience.length > 0 && (
        <section>
          <h2>Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="item experience-item">
              <div className="item-header">
                <h3>{exp.position} <span>at {exp.company}</span></h3>
                <span>{exp.duration}</span>
              </div>
              <p className="description">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.sectionVisibility.projects && data.projects.length > 0 && (
        <section>
          <h2>Key Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="item project-item">
              <div className="item-header">
                <h3>
                  {project.name}
                  {project.link && (
                    <a href={formatUrl(project.link)} target="_blank" rel="noopener noreferrer" className="project-link">
                      ({project.link.replace(/^https?:\/\//, '')})
                    </a>
                  )}
                </h3>
              </div>
              <p className="description">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.sectionVisibility.skills && data.skills.length > 0 && (
        <section className="no-split">
          <h2>Skills</h2>
          <p className="skills-inline">
            {data.skills.map((skill, index) => (
              <React.Fragment key={index}>
                <span className="skill-text">{skill}</span>
                {index < data.skills.length - 1 && <span className="skill-dot"> • </span>}
              </React.Fragment>
            ))}
          </p>
        </section>
      )}

      {/* Education & Certs - side by side if possible in compact, or just stacked tight */}
      <div className="compact-bottom">
        {data.sectionVisibility.education && data.education.length > 0 && (
          <section className="education-section">
            <h2>Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="item education-item">
                <div className="item-header">
                  <h3>{edu.degree}, {edu.school}</h3>
                  <span>{edu.year}</span>
                </div>
                {edu.percentage && <p className="result">Result: {edu.percentage}</p>}
              </div>
            ))}
          </section>
        )}

        {data.sectionVisibility.certificates && data.certificates.length > 0 && (
          <section className="certificates-section">
            <h2>Certifications</h2>
            {data.certificates.map((cert) => (
              <div key={cert.id} className="item certificate-item">
                <div className="item-header">
                  <h3>{cert.name}, {cert.organization}</h3>
                  <span>{cert.year}</span>
                </div>
                <p className="description">{cert.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default CompactTemplate;
