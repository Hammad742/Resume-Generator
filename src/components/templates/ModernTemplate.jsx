
const ModernTemplate = ({ data, formatUrl }) => {
  return (
    <>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '2rem' }}>
        {data.showProfilePhoto && data.personal.photo && (
          <div className="resume-photo-container">
            <img src={data.personal.photo} alt="Profile" className="resume-photo" style={{ width: '130px', height: '130px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          </div>
        )}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1a202c', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{data.personal.fullName}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>{data.personal.title}</p>
          <div style={{ color: '#4a5568', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            <a href={`mailto:${data.personal.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{data.personal.email}</a> | {data.personal.phone} | {data.personal.address}
            {(data.personal.linkedin || data.personal.github || data.personal.portfolio) && (
              <>
                <br />
                {[
                  data.personal.linkedin && (
                    <a key="li" href={formatUrl(data.personal.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {data.personal.linkedin.replace(/^https?:\/\//, '')}
                    </a>
                  ),
                  data.personal.github && (
                    <a key="gh" href={formatUrl(data.personal.github)} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {data.personal.github.replace(/^https?:\/\//, '')}
                    </a>
                  ),
                  data.personal.portfolio && (
                    <a key="pf" href={formatUrl(data.personal.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {data.personal.portfolio.replace(/^https?:\/\//, '')}
                    </a>
                  )
                ].filter(Boolean).reduce((prev, curr, i) => [prev, <span key={`sep-${i}`}> | </span>, curr])}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.personal.summary && (
        <section className="no-split" style={{ marginBottom: '2rem' }}>
          <h2 className="resume-section-title">Professional Summary</h2>
          <p className="resume-summary">{data.personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.sectionVisibility.experience && data.experience.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="resume-section-title">Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="experience-item" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2d3748' }}>{exp.position}</h3>
                <span style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600 }}>{exp.duration}</span>
              </div>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.4rem' }}>{exp.company}</p>
              <p className="resume-description">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.sectionVisibility.projects && data.projects.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="resume-section-title">Key Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="project-item" style={{ marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2d3748' }}>{project.name}</h3>
                {project.link && (
                  <a 
                    href={formatUrl(project.link)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}
                    className="resume-item-link"
                  >
                    {project.link}
                  </a>
                )}
              </div>
              <p className="resume-description">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.sectionVisibility.skills && data.skills.length > 0 && (
        <section className="no-split" style={{ marginBottom: '2rem' }}>
          <h2 className="resume-section-title">Skills</h2>
          <p className="resume-description" style={{ fontWeight: 500 }}>
            {data.skills.join(', ')}
          </p>
        </section>
      )}

      {/* Education */}
      {data.sectionVisibility.education && data.education.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 className="resume-section-title">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="education-item" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2d3748' }}>{edu.degree}</h3>
                <span style={{ fontSize: '0.95rem', color: '#718096' }}>{edu.year}</span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 500, marginBottom: '0.2rem' }}>{edu.school}</p>
              {edu.percentage && (
                <p style={{ fontSize: '0.9rem', color: '#718096' }}>Result: {edu.percentage}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.sectionVisibility.certificates && data.certificates.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 className="resume-section-title">Certifications</h2>
          {data.certificates.map((cert) => (
            <div key={cert.id} className="certificate-item" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#2d3748' }}>{cert.name}</h3>
                <span style={{ fontSize: '0.9rem', color: '#718096' }}>{cert.year}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.2rem' }}>{cert.organization}</p>
              <p className="resume-description">{cert.description}</p>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default ModernTemplate;
