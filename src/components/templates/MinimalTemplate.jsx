
const MinimalTemplate = ({ data, formatUrl }) => {
  return (
    <div className="template-minimal">
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
        {data.showProfilePhoto && data.personal.photo && (
          <img src={data.personal.photo} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0 }}>{data.personal.fullName}</h1>
          <p className="title" style={{ margin: '0.2rem 0 0.8rem 0' }}>{data.personal.title}</p>
          <div className="contact-info">
            <p>{data.personal.email} | {data.personal.phone} | {data.personal.address}</p>
            {(data.personal.linkedin || data.personal.github || data.personal.portfolio) && (
              <p>
                {[
                  data.personal.linkedin && <a key="li" href={formatUrl(data.personal.linkedin)} target="_blank" rel="noopener noreferrer">{data.personal.linkedin.replace(/^https?:\/\//, '')}</a>,
                  data.personal.github && <a key="gh" href={formatUrl(data.personal.github)} target="_blank" rel="noopener noreferrer">{data.personal.github.replace(/^https?:\/\//, '')}</a>,
                  data.personal.portfolio && <a key="pf" href={formatUrl(data.personal.portfolio)} target="_blank" rel="noopener noreferrer">{data.personal.portfolio.replace(/^https?:\/\//, '')}</a>
                ].filter(Boolean).reduce((prev, curr, i) => [prev, <span key={`sep-${i}`}> | </span>, curr])}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.personal.summary && (
        <section className="no-split">
          <h2>Professional Summary</h2>
          <hr />
          <p className="summary">{data.personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.sectionVisibility.experience && data.experience.length > 0 && (
        <section>
          <h2>Work Experience</h2>
          <hr />
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

      {/* Projects */}
      {data.sectionVisibility.projects && data.projects.length > 0 && (
        <section>
          <h2>Key Projects</h2>
          <hr />
          {data.projects.map((project) => (
            <div key={project.id} className="item project-item">
              <div className="item-header">
                <h3>{project.name}</h3>
                {project.link && (
                  <a href={formatUrl(project.link)} target="_blank" rel="noopener noreferrer">
                    {project.link.replace(/^https?:\/\//, '')}
                  </a>
                )}
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
          <hr />
          <p className="skills-list">{data.skills.join(', ')}</p>
        </section>
      )}

      {/* Education */}
      {data.sectionVisibility.education && data.education.length > 0 && (
        <section>
          <h2>Education</h2>
          <hr />
          {data.education.map((edu) => (
            <div key={edu.id} className="item education-item">
              <div className="item-header">
                <h3>{edu.degree}</h3>
                <span>{edu.year}</span>
              </div>
              <p className="school">{edu.school}</p>
              {edu.percentage && <p className="result">Result: {edu.percentage}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certificates */}
      {data.sectionVisibility.certificates && data.certificates.length > 0 && (
        <section>
          <h2>Certifications</h2>
          <hr />
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
    </div>
  );
};

export default MinimalTemplate;
