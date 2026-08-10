import { Document, Page, View, Text, Link, StyleSheet, Image } from '@react-pdf/renderer';

const formatUrl = (url) => {
  if (!url) return '';
  return /^(https?:\/\/|mailto:|tel:)/i.test(url) ? url : `https://${url}`;
};

const styles = StyleSheet.create({
  // Global page style
  page: {
    fontFamily: 'Helvetica',
    padding: 51, // 18mm in points
    backgroundColor: '#ffffff',
    fontSize: 9,
    color: '#2d3748',
    lineHeight: 1.4,
  },

  // -----------------------------------------
  // TEMPLATE 1: MODERN PROFESSIONAL
  // -----------------------------------------
  modernHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 15,
    marginBottom: 15,
  },
  modernPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    objectFit: 'cover',
  },
  modernHeaderText: {
    flex: 1,
    flexDirection: 'column',
  },
  modernName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 3,
    lineHeight: 1.15,
  },
  modernTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  modernContactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },
  modernContactText: {
    fontSize: 8.5,
    color: '#4a5568',
  },
  modernContactSeparator: {
    fontSize: 8.5,
    color: '#a0aec0',
    marginHorizontal: 6,
  },
  modernLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 2,
  },
  modernLinkText: {
    fontSize: 8.5,
    color: '#2563eb',
    textDecoration: 'none',
  },
  modernSection: {
    marginBottom: 14,
  },
  modernSectionTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#1a202c',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
    paddingBottom: 3,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  modernItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  modernItemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  modernItemDate: {
    fontSize: 8.5,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  modernCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 3,
  },
  modernDescription: {
    fontSize: 8.5,
    color: '#4a5568',
    lineHeight: 1.4,
  },

  // -----------------------------------------
  // TEMPLATE 2: MINIMAL ATS
  // -----------------------------------------
  minimalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 15,
    marginBottom: 15,
  },
  minimalPhoto: {
    width: 80,
    height: 80,
    marginRight: 15,
    objectFit: 'cover',
  },
  minimalHeaderText: {
    flex: 1,
    flexDirection: 'column',
  },
  minimalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 3,
    lineHeight: 1.15,
  },
  minimalTitle: {
    fontSize: 12,
    fontWeight: 'medium',
    color: '#444444',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  minimalContactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },
  minimalContactText: {
    fontSize: 8.5,
    color: '#333333',
  },
  minimalContactSeparator: {
    fontSize: 8.5,
    color: '#cccccc',
    marginHorizontal: 6,
  },
  minimalLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 2,
  },
  minimalLinkText: {
    fontSize: 8.5,
    color: '#111111',
    textDecoration: 'none',
  },
  minimalSection: {
    marginBottom: 14,
  },
  minimalSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  minimalHr: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginTop: 2,
    marginBottom: 8,
  },
  minimalItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  minimalItemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111111',
  },
  minimalItemDate: {
    fontSize: 8.5,
    color: '#555555',
  },
  minimalCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 3,
  },
  minimalDescription: {
    fontSize: 8.5,
    color: '#222222',
    lineHeight: 1.4,
  },

  // -----------------------------------------
  // TEMPLATE 3: SKILLS-FIRST FRESHER
  // -----------------------------------------
  fresherHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderBottomColor: '#3182ce',
    paddingBottom: 15,
    marginBottom: 15,
  },
  fresherHeaderText: {
    flex: 1,
    flexDirection: 'column',
  },
  fresherName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 3,
    lineHeight: 1.15,
  },
  fresherTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  fresherContactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },
  fresherContactText: {
    fontSize: 8.5,
    color: '#718096',
  },
  fresherDot: {
    fontSize: 8.5,
    color: '#718096',
    marginHorizontal: 6,
  },
  fresherLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 2,
  },
  fresherLinkText: {
    fontSize: 8.5,
    color: '#3182ce',
    textDecoration: 'none',
  },
  fresherPhoto: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    marginLeft: 15,
    objectFit: 'cover',
  },
  fresherSection: {
    marginBottom: 14,
  },
  fresherSectionTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#2b6cb0',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 3,
    marginBottom: 8,
  },
  fresherSkillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fresherSkillTag: {
    backgroundColor: '#ebf8ff',
    borderWidth: 1,
    borderColor: '#bee3f8',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginRight: 5,
    marginBottom: 5,
  },
  fresherProjectsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fresherProjectCard: {
    width: '48%',
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    padding: 8,
  },
  fresherItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  fresherItemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  fresherItemDate: {
    fontSize: 8,
    color: '#718096',
  },
  fresherCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 3,
  },
  fresherDescription: {
    fontSize: 8,
    color: '#4a5568',
    lineHeight: 1.35,
  },

  // -----------------------------------------
  // TEMPLATE 4: COMPACT TECH RESUME
  // -----------------------------------------
  compactHeader: {
    marginBottom: 12,
  },
  compactHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  compactPhoto: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
    objectFit: 'cover',
  },
  compactHeaderText: {
    flex: 1,
    flexDirection: 'column',
  },
  compactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 2,
    lineHeight: 1.15,
  },
  compactTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 6,
    lineHeight: 1.2,
  },
  compactContactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4,
  },
  compactContactText: {
    fontSize: 8,
    color: '#4a5568',
  },
  compactContactSeparator: {
    fontSize: 8,
    color: '#a0aec0',
    marginHorizontal: 6,
  },
  compactLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 2,
  },
  compactLinkText: {
    fontSize: 8,
    color: '#2563eb',
    textDecoration: 'none',
  },
  compactSection: {
    marginBottom: 10,
  },
  compactSectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#1a202c',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
    paddingBottom: 2,
    marginBottom: 6,
  },
  compactItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  compactItemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  compactItemDate: {
    fontSize: 8,
    color: '#718096',
  },
  compactCompany: {
    fontSize: 9,
    fontWeight: 'semibold',
    color: '#4a5568',
    marginBottom: 3,
  },
  compactDescription: {
    fontSize: 8.5,
    color: '#2d3748',
    lineHeight: 1.35,
  },
  compactBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  compactColumn: {
    width: '48%',
  },
  compactSkillText: {
    fontSize: 8.5,
    color: '#2d3748',
    lineHeight: 1.4,
  },
  compactSkillLabel: {
    fontWeight: 'bold',
    color: '#2d3748',
  }
});

// Modern Template PDF
const ModernTemplatePDF = ({ data }) => (
  <View>
    <View style={styles.modernHeader}>
      {data.showProfilePhoto && data.personal.photo && (
        <Image src={data.personal.photo} style={styles.modernPhoto} />
      )}
      <View style={styles.modernHeaderText}>
        {/* ROW 1: Name + Professional Title */}
        <Text style={styles.modernName}>{data.personal.fullName}</Text>
        <Text style={styles.modernTitle}>{data.personal.title}</Text>
        
        {/* ROW 2: Contact information */}
        <View style={styles.modernContactRow}>
          {data.personal.email && (
            <Link src={`mailto:${data.personal.email}`} style={{ textDecoration: 'none' }}>
              <Text style={styles.modernContactText}>{data.personal.email}</Text>
            </Link>
          )}
          {data.personal.email && data.personal.phone && (
            <Text style={styles.modernContactSeparator}>•</Text>
          )}
          {data.personal.phone && (
            <Text style={styles.modernContactText}>{data.personal.phone}</Text>
          )}
          {(data.personal.email || data.personal.phone) && data.personal.address && (
            <Text style={styles.modernContactSeparator}>•</Text>
          )}
          {data.personal.address && (
            <Text style={styles.modernContactText}>{data.personal.address}</Text>
          )}
        </View>
        
        {/* ROW 3: Clickable links */}
        {(data.personal.linkedin || data.personal.github || data.personal.portfolio) && (
          <View style={styles.modernLinksRow}>
            {data.personal.linkedin && (
              <Link src={formatUrl(data.personal.linkedin)} style={{ textDecoration: 'none' }}>
                <Text style={styles.modernLinkText}>
                  {data.personal.linkedin.replace(/^https?:\/\//, '')}
                </Text>
              </Link>
            )}
            {data.personal.linkedin && data.personal.github && (
              <Text style={styles.modernContactSeparator}>•</Text>
            )}
            {data.personal.github && (
              <Link src={formatUrl(data.personal.github)} style={{ textDecoration: 'none' }}>
                <Text style={styles.modernLinkText}>
                  {data.personal.github.replace(/^https?:\/\//, '')}
                </Text>
              </Link>
            )}
            {(data.personal.linkedin || data.personal.github) && data.personal.portfolio && (
              <Text style={styles.modernContactSeparator}>•</Text>
            )}
            {data.personal.portfolio && (
              <Link src={formatUrl(data.personal.portfolio)} style={{ textDecoration: 'none' }}>
                <Text style={styles.modernLinkText}>
                  {data.personal.portfolio.replace(/^https?:\/\//, '')}
                </Text>
              </Link>
            )}
          </View>
        )}
      </View>
    </View>

    {data.personal.summary && (
      <View style={styles.modernSection} wrap={false}>
        <Text style={styles.modernSectionTitle}>Professional Summary</Text>
        <Text style={styles.modernDescription}>{data.personal.summary}</Text>
      </View>
    )}

    {data.sectionVisibility.experience && data.experience.length > 0 && (
      <View style={styles.modernSection}>
        <Text style={styles.modernSectionTitle}>Work Experience</Text>
        {data.experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: 10 }} wrap={false}>
            <View style={styles.modernItemHeader}>
              <Text style={styles.modernItemTitle}>{exp.position}</Text>
              <Text style={styles.modernItemDate}>{exp.duration}</Text>
            </View>
            <Text style={styles.modernCompany}>{exp.company}</Text>
            <Text style={styles.modernDescription}>{exp.description}</Text>
          </View>
        ))}
      </View>
    )}

    {data.sectionVisibility.projects && data.projects.length > 0 && (
      <View style={styles.modernSection}>
        <Text style={styles.modernSectionTitle}>Key Projects</Text>
        {data.projects.map(project => (
          <View key={project.id} style={{ marginBottom: 8 }} wrap={false}>
            <View style={styles.modernItemHeader}>
              <Text style={styles.modernItemTitle}>{project.name}</Text>
              {project.link && (
                <Link src={formatUrl(project.link)} style={{ textDecoration: 'none' }}>
                  <Text style={{ fontSize: 8.5, color: '#2563eb' }}>
                    {project.link.replace(/^https?:\/\//, '')}
                  </Text>
                </Link>
              )}
            </View>
            <Text style={styles.modernDescription}>{project.description}</Text>
          </View>
        ))}
      </View>
    )}

    {data.sectionVisibility.skills && data.skills.length > 0 && (
      <View style={styles.modernSection} wrap={false}>
        <Text style={styles.modernSectionTitle}>Skills</Text>
        <Text style={styles.modernDescription}>{data.skills.join(', ')}</Text>
      </View>
    )}

    {data.sectionVisibility.education && data.education.length > 0 && (
      <View style={styles.modernSection}>
        <Text style={styles.modernSectionTitle}>Education</Text>
        {data.education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 8 }} wrap={false}>
            <View style={styles.modernItemHeader}>
              <Text style={styles.modernItemTitle}>{edu.degree}</Text>
              <Text style={styles.modernItemDate}>{edu.year}</Text>
            </View>
            <Text style={styles.modernCompany}>{edu.school}</Text>
            {edu.percentage && (
              <Text style={styles.modernDescription}>Result: {edu.percentage}</Text>
            )}
          </View>
        ))}
      </View>
    )}

    {data.sectionVisibility.certificates && data.certificates.length > 0 && (
      <View style={styles.modernSection}>
        <Text style={styles.modernSectionTitle}>Certifications</Text>
        {data.certificates.map(cert => (
          <View key={cert.id} style={{ marginBottom: 8 }} wrap={false}>
            <View style={styles.modernItemHeader}>
              <Text style={styles.modernItemTitle}>{cert.name}</Text>
              <Text style={styles.modernItemDate}>{cert.year}</Text>
            </View>
            <Text style={styles.modernCompany}>{cert.organization}</Text>
            {cert.description && (
              <Text style={styles.modernDescription}>{cert.description}</Text>
            )}
          </View>
        ))}
      </View>
    )}
  </View>
);

// Minimal Template PDF
const MinimalTemplatePDF = ({ data }) => (
  <View>
    <View style={styles.minimalHeader}>
      {data.showProfilePhoto && data.personal.photo && (
        <Image src={data.personal.photo} style={styles.minimalPhoto} />
      )}
      <View style={styles.minimalHeaderText}>
        {/* ROW 1: Name + Professional Title */}
        <Text style={styles.minimalName}>{data.personal.fullName}</Text>
        <Text style={styles.minimalTitle}>{data.personal.title}</Text>
        
        {/* ROW 2: Contact information */}
        <View style={styles.minimalContactRow}>
          {data.personal.email && (
            <Link src={`mailto:${data.personal.email}`} style={{ textDecoration: 'none' }}>
              <Text style={styles.minimalContactText}>{data.personal.email}</Text>
            </Link>
          )}
          {data.personal.email && data.personal.phone && (
            <Text style={styles.minimalContactSeparator}>•</Text>
          )}
          {data.personal.phone && (
            <Text style={styles.minimalContactText}>{data.personal.phone}</Text>
          )}
          {(data.personal.email || data.personal.phone) && data.personal.address && (
            <Text style={styles.minimalContactSeparator}>•</Text>
          )}
          {data.personal.address && (
            <Text style={styles.minimalContactText}>{data.personal.address}</Text>
          )}
        </View>
        
        {/* ROW 3: Clickable links */}
        {(data.personal.linkedin || data.personal.github || data.personal.portfolio) && (
          <View style={styles.minimalLinksRow}>
            {data.personal.linkedin && (
              <Link src={formatUrl(data.personal.linkedin)} style={{ textDecoration: 'none' }}>
                <Text style={styles.minimalLinkText}>
                  {data.personal.linkedin.replace(/^https?:\/\//, '')}
                </Text>
              </Link>
            )}
            {data.personal.linkedin && data.personal.github && (
              <Text style={styles.minimalContactSeparator}>•</Text>
            )}
            {data.personal.github && (
              <Link src={formatUrl(data.personal.github)} style={{ textDecoration: 'none' }}>
                <Text style={styles.minimalLinkText}>
                  {data.personal.github.replace(/^https?:\/\//, '')}
                </Text>
              </Link>
            )}
            {(data.personal.linkedin || data.personal.github) && data.personal.portfolio && (
              <Text style={styles.minimalContactSeparator}>•</Text>
            )}
            {data.personal.portfolio && (
              <Link src={formatUrl(data.personal.portfolio)} style={{ textDecoration: 'none' }}>
                <Text style={styles.minimalLinkText}>
                  {data.personal.portfolio.replace(/^https?:\/\//, '')}
                </Text>
              </Link>
            )}
          </View>
        )}
      </View>
    </View>

    {data.personal.summary && (
      <View style={styles.minimalSection} wrap={false}>
        <Text style={styles.minimalSectionTitle}>Professional Summary</Text>
        <View style={styles.minimalHr} />
        <Text style={styles.minimalDescription}>{data.personal.summary}</Text>
      </View>
    )}

    {data.sectionVisibility.experience && data.experience.length > 0 && (
      <View style={styles.minimalSection}>
        <Text style={styles.minimalSectionTitle}>Work Experience</Text>
        <View style={styles.minimalHr} />
        {data.experience.map(exp => (
          <View key={exp.id} style={{ marginBottom: 10 }} wrap={false}>
            <View style={styles.minimalItemHeader}>
              <Text style={styles.minimalItemTitle}>{exp.position}</Text>
              <Text style={styles.minimalItemDate}>{exp.duration}</Text>
            </View>
            <Text style={styles.minimalCompany}>{exp.company}</Text>
            <Text style={styles.minimalDescription}>{exp.description}</Text>
          </View>
        ))}
      </View>
    )}

    {data.sectionVisibility.projects && data.projects.length > 0 && (
      <View style={styles.minimalSection}>
        <Text style={styles.minimalSectionTitle}>Key Projects</Text>
        <View style={styles.minimalHr} />
        {data.projects.map(project => (
          <View key={project.id} style={{ marginBottom: 8 }} wrap={false}>
            <View style={styles.minimalItemHeader}>
              <Text style={styles.minimalItemTitle}>{project.name}</Text>
              {project.link && (
                <Link src={formatUrl(project.link)} style={{ textDecoration: 'none' }}>
                  <Text style={{ fontSize: 8.5, color: '#111111' }}>
                    {project.link.replace(/^https?:\/\//, '')}
                  </Text>
                </Link>
              )}
            </View>
            <Text style={styles.minimalDescription}>{project.description}</Text>
          </View>
        ))}
      </View>
    )}

    {data.sectionVisibility.skills && data.skills.length > 0 && (
      <View style={styles.minimalSection} wrap={false}>
        <Text style={styles.minimalSectionTitle}>Skills</Text>
        <View style={styles.minimalHr} />
        <Text style={styles.minimalDescription}>{data.skills.join(', ')}</Text>
      </View>
    )}

    {data.sectionVisibility.education && data.education.length > 0 && (
      <View style={styles.minimalSection}>
        <Text style={styles.minimalSectionTitle}>Education</Text>
        <View style={styles.minimalHr} />
        {data.education.map(edu => (
          <View key={edu.id} style={{ marginBottom: 8 }} wrap={false}>
            <View style={styles.minimalItemHeader}>
              <Text style={styles.minimalItemTitle}>{edu.degree}</Text>
              <Text style={styles.minimalItemDate}>{edu.year}</Text>
            </View>
            <Text style={styles.minimalCompany}>{edu.school}</Text>
            {edu.percentage && (
              <Text style={styles.minimalDescription}>Result: {edu.percentage}</Text>
            )}
          </View>
        ))}
      </View>
    )}

    {data.sectionVisibility.certificates && data.certificates.length > 0 && (
      <View style={styles.minimalSection}>
        <Text style={styles.minimalSectionTitle}>Certifications</Text>
        <View style={styles.minimalHr} />
        {data.certificates.map(cert => (
          <View key={cert.id} style={{ marginBottom: 8 }} wrap={false}>
            <View style={styles.minimalItemHeader}>
              <Text style={styles.minimalItemTitle}>{cert.name}</Text>
              <Text style={styles.minimalItemDate}>{cert.year}</Text>
            </View>
            <Text style={styles.minimalCompany}>{cert.organization}</Text>
            {cert.description && (
              <Text style={styles.minimalDescription}>{cert.description}</Text>
            )}
          </View>
        ))}
      </View>
    )}
  </View>
);

// Skills-First Fresher Template PDF
const FresherTemplatePDF = ({ data }) => {
  // Group project cards side-by-side to replicate CSS grid layout
  const projectPairs = [];
  for (let i = 0; i < data.projects.length; i += 2) {
    projectPairs.push(data.projects.slice(i, i + 2));
  }

  return (
    <View>
      <View style={styles.fresherHeader}>
        <View style={styles.fresherHeaderText}>
          {/* ROW 1: Name + Professional Title */}
          <Text style={styles.fresherName}>{data.personal.fullName}</Text>
          <Text style={styles.fresherTitle}>{data.personal.title}</Text>
          
          {/* ROW 2: Contact information */}
          <View style={styles.fresherContactRow}>
            {data.personal.email && (
              <Link src={`mailto:${data.personal.email}`} style={{ textDecoration: 'none' }}>
                <Text style={styles.fresherContactText}>{data.personal.email}</Text>
              </Link>
            )}
            {data.personal.email && data.personal.phone && (
              <Text style={styles.fresherDot}>•</Text>
            )}
            {data.personal.phone && (
              <Text style={styles.fresherContactText}>{data.personal.phone}</Text>
            )}
            {(data.personal.email || data.personal.phone) && data.personal.address && (
              <Text style={styles.fresherDot}>•</Text>
            )}
            {data.personal.address && (
              <Text style={styles.fresherContactText}>{data.personal.address}</Text>
            )}
          </View>
          
          {/* ROW 3: Clickable links */}
          {(data.personal.linkedin || data.personal.github || data.personal.portfolio) && (
            <View style={styles.fresherLinksRow}>
              {data.personal.linkedin && (
                <Link src={formatUrl(data.personal.linkedin)} style={{ textDecoration: 'none' }}>
                  <Text style={styles.fresherLinkText}>
                    {data.personal.linkedin.replace(/^https?:\/\//, '')}
                  </Text>
                </Link>
              )}
              {data.personal.linkedin && data.personal.github && (
                <Text style={styles.fresherDot}>•</Text>
              )}
              {data.personal.github && (
                <Link src={formatUrl(data.personal.github)} style={{ textDecoration: 'none' }}>
                  <Text style={styles.fresherLinkText}>
                    {data.personal.github.replace(/^https?:\/\//, '')}
                  </Text>
                </Link>
              )}
              {(data.personal.linkedin || data.personal.github) && data.personal.portfolio && (
                <Text style={styles.fresherDot}>•</Text>
              )}
              {data.personal.portfolio && (
                <Link src={formatUrl(data.personal.portfolio)} style={{ textDecoration: 'none' }}>
                  <Text style={styles.fresherLinkText}>
                    {data.personal.portfolio.replace(/^https?:\/\//, '')}
                  </Text>
                </Link>
              )}
            </View>
          )}
        </View>
        {data.showProfilePhoto && data.personal.photo && (
          <Image src={data.personal.photo} style={styles.fresherPhoto} />
        )}
      </View>

      {data.personal.summary && (
        <View style={styles.fresherSection} wrap={false}>
          <Text style={styles.fresherSectionTitle}>Professional Summary</Text>
          <Text style={styles.fresherDescription}>{data.personal.summary}</Text>
        </View>
      )}

      {data.sectionVisibility.skills && data.skills.length > 0 && (
        <View style={styles.fresherSection} wrap={false}>
          <Text style={styles.fresherSectionTitle}>Skills</Text>
          <View style={styles.fresherSkillsContainer}>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.fresherSkillTag}>{skill}</Text>
            ))}
          </View>
        </View>
      )}

      {data.sectionVisibility.projects && data.projects.length > 0 && (
        <View style={styles.fresherSection}>
          <Text style={styles.fresherSectionTitle}>Key Projects</Text>
          {projectPairs.map((pair, idx) => (
            <View key={idx} style={styles.fresherProjectsRow} wrap={false}>
              {pair.map(project => (
                <View key={project.id} style={styles.fresherProjectCard}>
                  <View style={styles.fresherItemHeader}>
                    <Text style={styles.fresherItemTitle}>{project.name}</Text>
                    {project.link && (
                      <Link src={formatUrl(project.link)} style={{ textDecoration: 'none' }}>
                        <Text style={{ fontSize: 8, color: '#3182ce' }}>Link</Text>
                      </Link>
                    )}
                  </View>
                  <Text style={styles.fresherDescription}>{project.description}</Text>
                </View>
              ))}
              {pair.length === 1 && <View style={{ width: '48%' }} />}
            </View>
          ))}
        </View>
      )}

      {data.sectionVisibility.certificates && data.certificates.length > 0 && (
        <View style={styles.fresherSection}>
          <Text style={styles.fresherSectionTitle}>Certifications</Text>
          {data.certificates.map(cert => (
            <View key={cert.id} style={{ marginBottom: 8 }} wrap={false}>
              <View style={styles.fresherItemHeader}>
                <Text style={styles.fresherItemTitle}>{cert.name}</Text>
                <Text style={styles.fresherItemDate}>{cert.year}</Text>
              </View>
              <Text style={styles.fresherCompany}>{cert.organization}</Text>
              <Text style={styles.fresherDescription}>{cert.description}</Text>
            </View>
          ))}
        </View>
      )}

      {data.sectionVisibility.education && data.education.length > 0 && (
        <View style={styles.fresherSection}>
          <Text style={styles.fresherSectionTitle}>Education</Text>
          {data.education.map(edu => (
            <View key={edu.id} style={{ marginBottom: 8 }} wrap={false}>
              <View style={styles.fresherItemHeader}>
                <Text style={styles.fresherItemTitle}>{edu.degree}</Text>
                <Text style={styles.fresherItemDate}>{edu.year}</Text>
              </View>
              <Text style={styles.fresherCompany}>{edu.school}</Text>
              {edu.percentage && (
                <Text style={styles.fresherDescription}>Grade: {edu.percentage}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {data.sectionVisibility.experience && data.experience.length > 0 && (
        <View style={styles.fresherSection}>
          <Text style={styles.fresherSectionTitle}>Work Experience</Text>
          {data.experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 8 }} wrap={false}>
              <View style={styles.fresherItemHeader}>
                <Text style={styles.fresherItemTitle}>{exp.position}</Text>
                <Text style={styles.fresherItemDate}>{exp.duration}</Text>
              </View>
              <Text style={styles.fresherCompany}>{exp.company}</Text>
              <Text style={styles.fresherDescription}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Compact Tech Template PDF
const CompactTemplatePDF = ({ data }) => {
  const hasPhoto = data.showProfilePhoto && data.personal.photo;
  const textAlignment = hasPhoto ? {} : { alignItems: 'center' };
  const rowAlignment = hasPhoto ? {} : { justifyContent: 'center' };

  return (
    <View>
      <View style={styles.compactHeader}>
        <View style={styles.compactHeaderRow}>
          {hasPhoto && (
            <Image src={data.personal.photo} style={styles.compactPhoto} />
          )}
          <View style={[styles.compactHeaderText, textAlignment]}>
            {/* ROW 1: Name + Professional Title */}
            <Text style={styles.compactName}>{data.personal.fullName}</Text>
            <Text style={styles.compactTitle}>{data.personal.title}</Text>
            
            {/* ROW 2: Contact Row */}
            <View style={[styles.compactContactRow, rowAlignment]}>
              {data.personal.email && (
                <Link src={`mailto:${data.personal.email}`} style={{ textDecoration: 'none' }}>
                  <Text style={styles.compactContactText}>{data.personal.email}</Text>
                </Link>
              )}
              {data.personal.email && data.personal.phone && (
                <Text style={styles.compactContactSeparator}>|</Text>
              )}
              {data.personal.phone && (
                <Text style={styles.compactContactText}>{data.personal.phone}</Text>
              )}
              {(data.personal.email || data.personal.phone) && data.personal.address && (
                <Text style={styles.compactContactSeparator}>|</Text>
              )}
              {data.personal.address && (
                <Text style={styles.compactContactText}>{data.personal.address}</Text>
              )}
            </View>
            
            {/* ROW 3: Links Row */}
            {(data.personal.linkedin || data.personal.github || data.personal.portfolio) && (
              <View style={[styles.compactLinksRow, rowAlignment]}>
                {data.personal.linkedin && (
                  <Link src={formatUrl(data.personal.linkedin)} style={{ textDecoration: 'none' }}>
                    <Text style={styles.compactLinkText}>
                      {data.personal.linkedin.replace(/^https?:\/\//, '')}
                    </Text>
                  </Link>
                )}
                {data.personal.linkedin && data.personal.github && (
                  <Text style={styles.compactContactSeparator}>|</Text>
                )}
                {data.personal.github && (
                  <Link src={formatUrl(data.personal.github)} style={{ textDecoration: 'none' }}>
                    <Text style={styles.compactLinkText}>
                      {data.personal.github.replace(/^https?:\/\//, '')}
                    </Text>
                  </Link>
                )}
                {(data.personal.linkedin || data.personal.github) && data.personal.portfolio && (
                  <Text style={styles.compactContactSeparator}>|</Text>
                )}
                {data.personal.portfolio && (
                  <Link src={formatUrl(data.personal.portfolio)} style={{ textDecoration: 'none' }}>
                    <Text style={styles.compactLinkText}>
                      {data.personal.portfolio.replace(/^https?:\/\//, '')}
                    </Text>
                  </Link>
                )}
              </View>
            )}
          </View>
        </View>
      </View>

      {data.personal.summary && (
        <View style={styles.compactSection} wrap={false}>
          <Text style={styles.compactSectionTitle}>Professional Summary</Text>
          <Text style={styles.compactDescription}>{data.personal.summary}</Text>
        </View>
      )}

      {data.sectionVisibility.skills && data.skills.length > 0 && (
        <View style={styles.compactSection} wrap={false}>
          <Text style={styles.compactSectionTitle}>Skills</Text>
          <Text style={styles.compactSkillText}>
            <Text style={styles.compactSkillLabel}>Technical Skills: </Text>
            {data.skills.join(', ')}
          </Text>
        </View>
      )}

      {data.sectionVisibility.experience && data.experience.length > 0 && (
        <View style={styles.compactSection}>
          <Text style={styles.compactSectionTitle}>Work Experience</Text>
          {data.experience.map(exp => (
            <View key={exp.id} style={{ marginBottom: 6 }} wrap={false}>
              <View style={styles.compactItemHeader}>
                <Text style={styles.compactItemTitle}>
                  {exp.position} <Text style={{ fontWeight: 'normal', color: '#4a5568' }}>| {exp.company}</Text>
                </Text>
                <Text style={styles.compactItemDate}>{exp.duration}</Text>
              </View>
              <Text style={styles.compactDescription}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {data.sectionVisibility.projects && data.projects.length > 0 && (
        <View style={styles.compactSection}>
          <Text style={styles.compactSectionTitle}>Key Projects</Text>
          {data.projects.map(project => (
            <View key={project.id} style={{ marginBottom: 6 }} wrap={false}>
              <View style={styles.compactItemHeader}>
                <Text style={styles.compactItemTitle}>
                  {project.name}
                  {project.link && (
                    <Link src={formatUrl(project.link)} style={{ textDecoration: 'none' }}>
                      <Text style={{ fontSize: 8, color: '#2563eb' }}>
                        {'  '}{project.link.replace(/^https?:\/\//, '')}
                      </Text>
                    </Link>
                  )}
                </Text>
              </View>
              <Text style={styles.compactDescription}>{project.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Side-by-side columns for Education and Certifications */}
      <View style={styles.compactBottom}>
        {data.sectionVisibility.education && data.education.length > 0 && (
          <View style={styles.compactColumn}>
            <View style={styles.compactSection}>
              <Text style={styles.compactSectionTitle}>Education</Text>
              {data.education.map(edu => (
                <View key={edu.id} style={{ marginBottom: 5 }} wrap={false}>
                  <View style={styles.compactItemHeader}>
                    <Text style={styles.compactItemTitle}>{edu.degree}</Text>
                    <Text style={styles.compactItemDate}>{edu.year}</Text>
                  </View>
                  <Text style={styles.compactCompany}>{edu.school}</Text>
                  {edu.percentage && (
                    <Text style={styles.compactDescription}>Result: {edu.percentage}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {data.sectionVisibility.certificates && data.certificates.length > 0 && (
          <View style={styles.compactColumn}>
            <View style={styles.compactSection}>
              <Text style={styles.compactSectionTitle}>Certifications</Text>
              {data.certificates.map(cert => (
                <View key={cert.id} style={{ marginBottom: 5 }} wrap={false}>
                  <View style={styles.compactItemHeader}>
                    <Text style={styles.compactItemTitle}>{cert.name}</Text>
                    <Text style={styles.compactItemDate}>{cert.year}</Text>
                  </View>
                  <Text style={styles.compactCompany}>{cert.organization}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export const PDFDocument = ({ data }) => {
  const template = data.template || 'modern';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {template === 'modern' && <ModernTemplatePDF data={data} />}
        {template === 'minimal' && <MinimalTemplatePDF data={data} />}
        {template === 'fresher' && <FresherTemplatePDF data={data} />}
        {template === 'compact' && <CompactTemplatePDF data={data} />}
      </Page>
    </Document>
  );
};
