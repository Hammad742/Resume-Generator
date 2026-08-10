import { useState, useRef, useEffect } from 'react'
import { Download, Plus, User, Briefcase, GraduationCap, Code, X, Eye, EyeOff, FolderGit2, Camera, Pencil, Award, FileSearch, RotateCcw, Trash2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import { exportToPDF } from './utils/PaginationService'
import './App.css'
import './styles/templates.css'
import ModernTemplate from './components/templates/ModernTemplate'
import MinimalTemplate from './components/templates/MinimalTemplate'
import FresherTemplate from './components/templates/FresherTemplate'
import CompactTemplate from './components/templates/CompactTemplate'
import AtsAnalyzer from './components/AtsAnalyzer'
const SUGGESTED_SKILLS = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Git', 'CSS', 'HTML', 'Figma']

const formatUrl = (url) => {
  if (!url) return '';
  return /^(https?:\/\/|mailto:|tel:)/i.test(url) ? url : `https://${url}`;
};

const INITIAL_DATA = {
  template: 'modern',
  showProfilePhoto: true,
  personal: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    photo: null,
    linkedin: '',
    github: '',
    portfolio: ''
  },
  experience: [
    {
      id: 1,
      company: '',
      position: '',
      duration: '',
      description: ''
    }
  ],
  education: [
    {
      id: 1,
      school: '',
      degree: '',
      year: '',
      percentage: ''
    }
  ],
  projects: [
    {
      id: 1,
      name: '',
      link: '',
      description: ''
    }
  ],
  certificates: [
    {
      id: 1,
      name: '',
      organization: '',
      year: '',
      description: ''
    }
  ],
  skills: [],
  sectionVisibility: {
    experience: true,
    education: true,
    projects: true,
    skills: true,
    certificates: true
  }
}

const SUGGESTED_DEGREES = [
  // Engineering
  'B.Tech in Computer Science',
  'B.Tech in Information Technology',
  'B.E. in Mechanical Engineering',
  'B.E. in Civil Engineering',
  'B.S. in Electrical Engineering',
  'M.Tech in Data Science',
  'M.S. in Software Engineering',
  // Medical & Pharmacy
  'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
  'BDS (Bachelor of Dental Surgery)',
  'D.Pharm (Diploma in Pharmacy)',
  'B.Pharm (Bachelor of Pharmacy)',
  'M.Pharm (Master of Pharmacy)',
  'Pharma.D (Doctor of Pharmacy)',
  'M.D. in General Medicine',
  // Nursing
  'B.Sc in Nursing',
  'M.Sc in Nursing',
  'GNM (General Nursing and Midwifery)',
  'ANM (Auxiliary Nurse Midwifery)',
  'Bachelor of Physiotherapy (BPT)',
  'MD in Pediatrics'
]

const SKILLS_MAPPING = {
  'Computer Science': ['Java', 'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'AWS'],
  'Information Technology': ['Cloud Computing', 'Networking', 'Cybersecurity', 'Python', 'SQL'],
  'Mechanical': ['AutoCAD', 'SolidWorks', 'MATLAB', 'Thermodynamics', 'Manufacturing'],
  'Civil': ['AutoCAD', 'Revit', 'Structural Analysis', 'Surveying', 'Project Management'],
  'Electrical': ['Circuit Design', 'PLC Programming', 'MATLAB', 'Power Systems'],
  'Medicine': ['Clinical Diagnosis', 'Patient Care', 'Emergency Medicine', 'Medical Ethics'],
  'MBBS': ['Clinical Diagnosis', 'Patient Care', 'Emergency Medicine', 'Medical Ethics'],
  'Surgery': ['Surgical Assistance', 'Sterilization', 'Anatomy', 'Pre-operative Care'],
  'Pharmacy': ['Pharmacology', 'Drug Formulation', 'Clinical Pharmacy', 'Pharmaceutical Analysis'],
  'Pharm': ['Pharmacology', 'Drug Formulation', 'Clinical Pharmacy', 'Pharmaceutical Analysis'],
  'Nursing': ['Patient Monitoring', 'Vital Signs', 'Wound Care', 'BLS', 'ACLS', 'Patient Education'],
  'Physiotherapy': ['Exercise Therapy', 'Manual Therapy', 'Rehabilitation', 'Kinesiology']
}

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resume_data')
    if (saved) {
      const parsed = JSON.parse(saved)
      
      // If the saved data is the old hardcoded default data, ignore it and use the new empty INITIAL_DATA
      if (parsed.personal?.fullName === 'John Doe' && parsed.personal?.title === 'Senior Software Engineer') {
        return INITIAL_DATA
      }

      const mergedVisibility = {
        ...INITIAL_DATA.sectionVisibility,
        ...parsed.sectionVisibility
      }
      return {
        ...INITIAL_DATA,
        ...parsed,
        personal: {
          ...INITIAL_DATA.personal,
          ...(parsed.personal || {})
        },
        projects: parsed.projects || INITIAL_DATA.projects,
        certificates: parsed.certificates || INITIAL_DATA.certificates,
        sectionVisibility: mergedVisibility,
        template: parsed.template || INITIAL_DATA.template,
        showProfilePhoto: parsed.showProfilePhoto !== undefined ? parsed.showProfilePhoto : INITIAL_DATA.showProfilePhoto
      }
    }
    return INITIAL_DATA
  })
  
  const [activeDegreeDropdown, setActiveDegreeDropdown] = useState(null)
  const [skillInput, setSkillInput] = useState('')
  const [cropModal, setCropModal] = useState({ isOpen: false, image: null })
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 })
  const resumeRef = useRef()
  const cropperContainerRef = useRef(null)
  const isDragging = useRef(false)
  const [isDraggingState, setIsDraggingState] = useState(false)
  const startPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    localStorage.setItem('resume_data', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isResetModalOpen && e.key === 'Enter') {
        confirmReset()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isResetModalOpen])

  const toggleSection = (section) => {
    setData(prev => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [section]: !prev.sectionVisibility[section]
      }
    }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a JPG or PNG image.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setCropModal({ isOpen: true, image: reader.result })
      setZoom(1)
      setCropOffset({ x: 0, y: 0 })
    }
    reader.readAsDataURL(file)
  }

  const handleUseOriginal = () => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, photo: cropModal.image }
    }))
    setCropModal({ isOpen: false, image: null })
  }

  const handleCropDone = async () => {
    const viewport = cropperContainerRef.current
    if (!viewport) return

    try {
      const canvas = await html2canvas(viewport, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      })

      setData(prev => ({
        ...prev,
        personal: { ...prev.personal, photo: canvas.toDataURL('image/png') }
      }))
      setCropModal({ isOpen: false, image: null })
    } catch (error) {
      console.error('Cropping failed:', error)
      alert('Failed to crop image. Please try again.')
    }
  }

  const handleMouseDown = (e) => {
    isDragging.current = true
    setIsDraggingState(true)
    startPos.current = { x: e.clientX - cropOffset.x, y: e.clientY - cropOffset.y }
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    setCropOffset({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y
    })
  }

  const handleMouseUp = () => {
    isDragging.current = false
    setIsDraggingState(false)
  }

  const handleTouchStart = (e) => {
    isDragging.current = true
    setIsDraggingState(true)
    const touch = e.touches[0]
    startPos.current = { x: touch.clientX - cropOffset.x, y: touch.clientY - cropOffset.y }
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current) return
    const touch = e.touches[0]
    setCropOffset({
      x: touch.clientX - startPos.current.x,
      y: touch.clientY - startPos.current.y
    })
  }

  const removePhoto = () => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, photo: null }
    }))
  }

  const handlePersonalChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }))
  }

  const handleDynamicChange = (section, id, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)
    }))
  }

  const addItem = (section) => {
    const newItem = { id: Date.now() }
    if (section === 'experience') {
      newItem.company = ''
      newItem.position = ''
      newItem.duration = ''
      newItem.description = ''
    } else if (section === 'education') {
      newItem.school = ''
      newItem.degree = ''
      newItem.year = ''
      newItem.percentage = ''
    } else if (section === 'projects') {
      newItem.name = ''
      newItem.link = ''
      newItem.description = ''
    } else if (section === 'certificates') {
      newItem.name = ''
      newItem.organization = ''
      newItem.year = ''
      newItem.description = ''
    }
    setData(prev => ({ ...prev, [section]: [...prev[section], newItem] }))
  }

  const removeItem = (section, id) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }))
  }

  const handleSkillInput = (e) => {
    const value = e.target.value
    if (value.endsWith(',')) {
      const newSkill = value.slice(0, -1).trim()
      if (newSkill && !data.skills.includes(newSkill)) {
        setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }))
      }
      setSkillInput('')
    } else {
      setSkillInput(value)
    }
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newSkill = skillInput.trim()
      if (newSkill && !data.skills.includes(newSkill)) {
        setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }))
      }
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }))
  }

  const addSuggestedSkill = (skill) => {
    if (!data.skills.includes(skill)) {
      setData(prev => ({ ...prev, skills: [...prev.skills, skill] }))
    }
  }

  const getSuggestedSkills = () => {
    const degrees = data.education.map(edu => edu.degree.toLowerCase())
    let suggestions = []
    
    Object.keys(SKILLS_MAPPING).forEach(key => {
      if (degrees.some(d => d.includes(key.toLowerCase()))) {
        suggestions = [...suggestions, ...SKILLS_MAPPING[key]]
      }
    })
    
    return [...new Set(suggestions)].filter(s => !data.skills.includes(s))
  }

  const downloadPDF = async () => {
    await exportToPDF(data)
  }

  const handleReset = () => {
    setIsResetModalOpen(true)
  }

  function confirmReset() {
    setData(INITIAL_DATA)
    localStorage.removeItem('resume_data')
    setIsResetModalOpen(false)
  }

  return (
    <div className="app-container">
      {/* Reset Modal */}
      {isResetModalOpen && (
        <div className="modal-overlay" onClick={() => setIsResetModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '400px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Reset All Data?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Are you sure you want to reset all data? This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn-outline" onClick={() => setIsResetModalOpen(false)}>Cancel</button>
              <button className="btn-primary" style={{ background: '#ef4444', borderColor: '#ef4444' }} onClick={confirmReset}>Yes, Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* Crop Modal */}
      {cropModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Crop Your Photo</h3>
            <div className="cropper-viewport-wrapper">
              <div 
                className="cropper-viewport"
                ref={cropperContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                <img 
                  src={cropModal.image} 
                  alt="Crop" 
                  className="cropper-image"
                  style={{ 
                    transform: `translate(${cropOffset.x}px, ${cropOffset.y}px) scale(${zoom})`,
                    cursor: isDraggingState ? 'grabbing' : 'grab'
                  }} 
                />
                <div className="cropper-overlay"></div>
              </div>
            </div>
            
            <div className="cropper-controls">
              <div className="zoom-slider">
                <span>Zoom</span>
                <input 
                  type="range" 
                  min="0.1" 
                  max="10" 
                  step="0.05" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))} 
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.5rem' }}>
                Drag image to position. Use slider to zoom.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <button className="btn-outline" style={{ flex: '1 1 100%' }} onClick={() => setCropModal({ isOpen: false, image: null })}>Cancel</button>
                <button className="btn-outline" style={{ flex: 1 }} onClick={handleUseOriginal}>Use Original</button>
                <button className="btn-primary" style={{ flex: 1 }} onClick={handleCropDone}>Crop & Done</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar: Form */}
      <aside className="sidebar">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>Resume Builder</h1>
            <p style={{ color: 'var(--text-muted)' }}>Build your professional presence</p>
          </div>
          <button className="btn-outline reset-btn" onClick={handleReset} style={{ padding: '0.5rem', color: '#64748b', borderColor: '#e2e8f0', transition: 'all 0.2s ease' }}>
            <RotateCcw size={18} className="reset-btn-icon" />
          </button>
        </header>


        {/* Personal Info */}
        <section className="section-card">
          <h3 className="section-title"><User size={20} /> Personal Information</h3>
          
          <div className="photo-upload-container" style={{ marginBottom: '1.5rem' }}>
            <label>Profile Picture</label>
            <div className="photo-upload-area">
              {data.personal.photo ? (
                <div className="photo-preview-wrapper">
                  <div className="photo-edit-overlay" onClick={() => document.getElementById('photo-upload-input-edit').click()}>
                    <Pencil size={18} />
                    <span>Edit</span>
                  </div>
                  <input 
                    id="photo-upload-input-edit"
                    type="file" 
                    onChange={handlePhotoUpload} 
                    accept="image/png, image/jpeg" 
                    style={{ display: 'none' }} 
                  />
                  <img src={data.personal.photo} alt="Profile" className="photo-preview" />
                  <button className="remove-photo-btn" onClick={(e) => { e.stopPropagation(); removePhoto(); }} title="Remove photo">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <input type="file" onChange={handlePhotoUpload} accept="image/png, image/jpeg" style={{ display: 'none' }} />
                  <Camera size={24} />
                  <span>Upload Photo</span>
                  <small>JPG, PNG (Max 5MB)</small>
                </label>
              )}
            </div>
          </div>

          {[
            { label: 'Full Name', name: 'fullName', placeholder: 'John Doe' },
            { label: 'Professional Title', name: 'title', placeholder: 'Software Engineer' },
            { label: 'Email', name: 'email', placeholder: 'john@example.com' },
            { label: 'Phone', name: 'phone', placeholder: '+1 234 567 890' },
            { label: 'Location', name: 'address', placeholder: 'New York, USA' },
            { label: 'LinkedIn', name: 'linkedin', placeholder: 'linkedin.com/in/username' },
            { label: 'GitHub', name: 'github', placeholder: 'github.com/username' },
            { label: 'Portfolio (Optional)', name: 'portfolio', placeholder: 'yourwebsite.com' }
          ].map(field => (
            <div className="form-group" key={field.name}>
              <label>{field.label}</label>
              <div className="input-with-clear">
                <input 
                  name={field.name} 
                  value={data.personal[field.name]} 
                  onChange={handlePersonalChange} 
                  placeholder={field.placeholder} 
                />
                {data.personal[field.name] && (
                  <button 
                    className="clear-input-btn" 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handlePersonalChange({ target: { name: field.name, value: '' } })}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="form-group">
            <label>Summary</label>
            <div className="input-with-clear">
              <textarea 
                name="summary" 
                value={data.personal.summary} 
                onChange={handlePersonalChange} 
                rows="3" 
                placeholder="Brief professional summary" 
              />
              {data.personal.summary && (
                <button 
                  className="clear-input-btn" 
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handlePersonalChange({ target: { name: 'summary', value: '' } })}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className={`section-card ${!data.sectionVisibility?.experience ? 'section-hidden' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 className="section-title" style={{ marginBottom: 0 }}><Briefcase size={20} /> Experience</h3>
              <button className="visibility-btn" onClick={() => toggleSection('experience')}>
                {data.sectionVisibility?.experience ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            <button className="btn-outline" onClick={() => addItem('experience')} style={{ padding: '0.5rem' }} disabled={!data.sectionVisibility?.experience}><Plus size={18} /></button>
          </div>
          {data.sectionVisibility?.experience && data.experience.map(exp => (
            <div key={exp.id} className="dynamic-item">
              <button className="remove-btn" onClick={() => removeItem('experience', exp.id)}><Trash2 size={16} /></button>
              <div className="input-with-clear" style={{ marginBottom: '0.5rem' }}>
                <input 
                  value={exp.company} 
                  onChange={(e) => handleDynamicChange('experience', exp.id, 'company', e.target.value)} 
                  placeholder="Company" 
                />
                {exp.company && (
                  <button 
                    className="clear-input-btn" 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleDynamicChange('experience', exp.id, 'company', '')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="input-with-clear" style={{ marginBottom: '0.5rem' }}>
                <input 
                  value={exp.position} 
                  onChange={(e) => handleDynamicChange('experience', exp.id, 'position', e.target.value)} 
                  placeholder="Position" 
                />
                {exp.position && (
                  <button 
                    className="clear-input-btn" 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleDynamicChange('experience', exp.id, 'position', '')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="input-with-clear" style={{ marginBottom: '0.5rem' }}>
                <input 
                  value={exp.duration} 
                  onChange={(e) => handleDynamicChange('experience', exp.id, 'duration', e.target.value)} 
                  placeholder="Duration (e.g., 2020 - 2023)" 
                />
                {exp.duration && (
                  <button 
                    className="clear-input-btn" 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleDynamicChange('experience', exp.id, 'duration', '')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="input-with-clear">
                <textarea 
                  value={exp.description} 
                  onChange={(e) => handleDynamicChange('experience', exp.id, 'description', e.target.value)} 
                  placeholder="Description" 
                  rows="2" 
                />
                {exp.description && (
                  <button 
                    className="clear-input-btn" 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleDynamicChange('experience', exp.id, 'description', '')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className={`section-card ${!data.sectionVisibility?.education ? 'section-hidden' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 className="section-title" style={{ marginBottom: 0 }}><GraduationCap size={20} /> Education</h3>
              <button className="visibility-btn" onClick={() => toggleSection('education')}>
                {data.sectionVisibility?.education ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            <button className="btn-outline" onClick={() => addItem('education')} style={{ padding: '0.5rem' }} disabled={!data.sectionVisibility?.education}><Plus size={18} /></button>
          </div>
          {data.sectionVisibility?.education && data.education.map(edu => (
            <div key={edu.id} className="dynamic-item">
              <button className="remove-btn" onClick={() => removeItem('education', edu.id)}><Trash2 size={16} /></button>
              <div className="input-with-clear" style={{ marginBottom: '0.5rem' }}>
                <input 
                  value={edu.school} 
                  onChange={(e) => handleDynamicChange('education', edu.id, 'school', e.target.value)} 
                  placeholder="School/University" 
                />
                {edu.school && (
                  <button 
                    className="clear-input-btn" 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleDynamicChange('education', edu.id, 'school', '')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              
              <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                  <div className="input-with-clear">
                    <input 
                      value={edu.degree} 
                      onChange={(e) => handleDynamicChange('education', edu.id, 'degree', e.target.value)} 
                      onFocus={() => setActiveDegreeDropdown(edu.id)}
                      onBlur={() => setTimeout(() => setActiveDegreeDropdown(null), 200)}
                      placeholder="Degree (e.g., B.Tech in CS)" 
                    />
                    {edu.degree && (
                      <button 
                        className="clear-input-btn" 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          handleDynamicChange('education', edu.id, 'degree', '')
                          // Clear skills if they match the current degree mapping
                          const key = Object.keys(SKILLS_MAPPING).find(k => edu.degree.toLowerCase().includes(k.toLowerCase()))
                          if (key) {
                            setData(prev => ({ ...prev, skills: [] }))
                          }
                        }}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  {activeDegreeDropdown === edu.id && (
                    <div className="suggestion-dropdown">
                      {SUGGESTED_DEGREES
                        .filter(d => d.toLowerCase().includes(edu.degree.toLowerCase()))
                        .map((d, i) => (
                          <div 
                            key={i} 
                            className="suggestion-item"
                            onMouseDown={(e) => {
                              e.preventDefault(); // Keep input focused to prevent immediate blur
                              const oldKey = Object.keys(SKILLS_MAPPING).find(k => edu.degree.toLowerCase().includes(k.toLowerCase()))
                              handleDynamicChange('education', edu.id, 'degree', d)
                              
                              // Replace skills if empty OR if they match the old degree's mapping
                              const newKey = Object.keys(SKILLS_MAPPING).find(k => d.toLowerCase().includes(k.toLowerCase()))
                              if (newKey) {
                                const oldSkills = oldKey ? SKILLS_MAPPING[oldKey].slice(0, 3) : []
                                const currentSkills = data.skills
                                
                                if (currentSkills.length === 0 || JSON.stringify(currentSkills) === JSON.stringify(oldSkills)) {
                                  setData(prev => ({ ...prev, skills: SKILLS_MAPPING[newKey].slice(0, 3) }))
                                }
                              }
                              setActiveDegreeDropdown(null); // Dismiss suggestion dropdown
                            }}
                          >
                            {d}
                          </div>
                        ))
                      }
                    </div>
                  )}
              </div>

              <div className="input-with-clear" style={{ marginBottom: '0.5rem' }}>
                <input 
                  value={edu.year} 
                  onChange={(e) => handleDynamicChange('education', edu.id, 'year', e.target.value)} 
                  placeholder="Year" 
                />
                {edu.year && (
                  <button 
                    className="clear-input-btn" 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleDynamicChange('education', edu.id, 'year', '')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="input-with-clear">
                <input 
                  value={edu.percentage} 
                  onChange={(e) => handleDynamicChange('education', edu.id, 'percentage', e.target.value)} 
                  placeholder="Percentage / CGPA (e.g., 85% or 8.5)" 
                />
                {edu.percentage && (
                  <button 
                    className="clear-input-btn" 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleDynamicChange('education', edu.id, 'percentage', '')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className={`section-card ${!data.sectionVisibility?.projects ? 'section-hidden' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 className="section-title" style={{ marginBottom: 0 }}><FolderGit2 size={20} /> Projects</h3>
              <button className="visibility-btn" onClick={() => toggleSection('projects')}>
                {data.sectionVisibility?.projects ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            <button className="btn-outline" onClick={() => addItem('projects')} style={{ padding: '0.5rem' }} disabled={!data.sectionVisibility?.projects}><Plus size={18} /></button>
          </div>
          {data.sectionVisibility?.projects && data.projects.map(project => (
            <div key={project.id} className="dynamic-item">
              <button className="remove-btn" onClick={() => removeItem('projects', project.id)}><Trash2 size={16} /></button>
              <div className="input-with-clear" style={{ marginBottom: '0.5rem' }}>
                <input 
                  value={project.name} 
                  onChange={(e) => handleDynamicChange('projects', project.id, 'name', e.target.value)} 
                  placeholder="Project Name" 
                />
                {project.name && (
                  <button className="clear-input-btn" onMouseDown={e => e.preventDefault()} onClick={() => handleDynamicChange('projects', project.id, 'name', '')}><X size={14} /></button>
                )}
              </div>
              <div className="input-with-clear" style={{ marginBottom: '0.5rem' }}>
                <input 
                  value={project.link} 
                  onChange={(e) => handleDynamicChange('projects', project.id, 'link', e.target.value)} 
                  placeholder="Project Link (e.g., github.com/...)" 
                />
                {project.link && (
                  <button className="clear-input-btn" onMouseDown={e => e.preventDefault()} onClick={() => handleDynamicChange('projects', project.id, 'link', '')}><X size={14} /></button>
                )}
              </div>
              <div className="input-with-clear">
                <textarea 
                  value={project.description} 
                  onChange={(e) => handleDynamicChange('projects', project.id, 'description', e.target.value)} 
                  placeholder="Project Description" 
                  rows="2" 
                />
                {project.description && (
                  <button className="clear-input-btn" onMouseDown={e => e.preventDefault()} onClick={() => handleDynamicChange('projects', project.id, 'description', '')}><X size={14} /></button>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Certificates Section */}
        <section className="section-card">
          <div className="section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 className="section-title" style={{ marginBottom: 0 }}><Award size={20} /> Certificates</h3>
              <button className="visibility-btn" onClick={() => toggleSection('certificates')}>
                {data.sectionVisibility.certificates ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>
          
          {data.sectionVisibility.certificates && (
            <>
              {data.certificates.map((cert) => (
                <div key={cert.id} className="dynamic-item">
                  <button className="remove-btn" onClick={() => removeItem('certificates', cert.id)}><Trash2 size={16} /></button>
                  <div className="form-group">
                    <label>Certificate Name</label>
                    <div className="input-with-clear">
                      <input 
                        value={cert.name} 
                        onChange={(e) => handleDynamicChange('certificates', cert.id, 'name', e.target.value)} 
                        placeholder="Certificate Name (e.g., AWS Certified Solutions Architect)" 
                      />
                      {cert.name && (
                        <button className="clear-input-btn" onMouseDown={e => e.preventDefault()} onClick={() => handleDynamicChange('certificates', cert.id, 'name', '')}><X size={14} /></button>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <label>Issuing Organization</label>
                      <div className="input-with-clear">
                        <input 
                          value={cert.organization} 
                          onChange={(e) => handleDynamicChange('certificates', cert.id, 'organization', e.target.value)} 
                          placeholder="Organization (e.g., Google)" 
                        />
                        {cert.organization && (
                          <button className="clear-input-btn" onMouseDown={e => e.preventDefault()} onClick={() => handleDynamicChange('certificates', cert.id, 'organization', '')}><X size={14} /></button>
                        )}
                      </div>
                    </div>
                    <div className="form-group" style={{ width: '120px' }}>
                      <label>Year</label>
                      <div className="input-with-clear">
                        <input 
                          value={cert.year} 
                          onChange={(e) => handleDynamicChange('certificates', cert.id, 'year', e.target.value)} 
                          placeholder="2023" 
                        />
                        {cert.year && (
                          <button className="clear-input-btn" onMouseDown={e => e.preventDefault()} onClick={() => handleDynamicChange('certificates', cert.id, 'year', '')}><X size={14} /></button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <div className="input-with-clear">
                      <textarea 
                        value={cert.description} 
                        onChange={(e) => handleDynamicChange('certificates', cert.id, 'description', e.target.value)} 
                        placeholder="Briefly describe your achievement" 
                        rows="2" 
                      />
                      {cert.description && (
                        <button className="clear-input-btn" onMouseDown={e => e.preventDefault()} onClick={() => handleDynamicChange('certificates', cert.id, 'description', '')}><X size={14} /></button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-outline" onClick={() => addItem('certificates')} style={{ width: '100%', marginTop: '0.5rem' }}>
                <Plus size={18} /> Add Certificate
              </button>
            </>
          )}
        </section>

        {/* Skills */}
        <section className={`section-card ${!data.sectionVisibility?.skills ? 'section-hidden' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 className="section-title" style={{ marginBottom: 0 }}><Code size={20} /> Skills</h3>
              <button className="visibility-btn" onClick={() => toggleSection('skills')}>
                {data.sectionVisibility?.skills ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>
          {data.sectionVisibility?.skills && (
            <>
              <div className="form-group">
                <label>Skills (Type and press comma or Enter)</label>
                <div className="skills-tag-container">
                  {data.skills.map(skill => (
                    <span key={skill} className="skill-tag">
                      {skill}
                      <button onClick={() => removeSkill(skill)}><X size={12} /></button>
                    </span>
                  ))}
                  <input 
                    value={skillInput} 
                    onChange={handleSkillInput} 
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Add skill..." 
                    className="tag-input"
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {getSuggestedSkills().length > 0 ? (
                  <>
                    <label style={{ fontSize: '0.75rem', width: '100%', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Relevant to your degree:</label>
                    {getSuggestedSkills().slice(0, 10).map(skill => (
                      <button 
                        key={skill} 
                        className="btn-outline" 
                        onClick={() => addSuggestedSkill(skill)}
                        style={{ 
                          padding: '0.25rem 0.5rem', 
                          fontSize: '0.75rem', 
                          borderRadius: '4px',
                          background: 'rgba(37, 99, 235, 0.05)',
                          borderColor: 'rgba(37, 99, 235, 0.2)'
                        }}
                      >
                        + {skill}
                      </button>
                    ))}
                  </>
                ) : (
                  SUGGESTED_SKILLS.slice(0, 8).map(skill => (
                    <button 
                      key={skill} 
                      className="btn-outline" 
                      onClick={() => addSuggestedSkill(skill)}
                      style={{ 
                        padding: '0.25rem 0.5rem', 
                        fontSize: '0.75rem', 
                        opacity: data.skills.includes(skill) ? 0.5 : 1,
                        cursor: data.skills.includes(skill) ? 'default' : 'pointer'
                      }}
                      disabled={data.skills.includes(skill)}
                    >
                      <Plus size={12} /> {skill}
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </section>

        {/* Template Settings */}
        <section className="section-card" style={{ marginBottom: '1.5rem' }}>
          <h3 className="section-title" style={{ marginBottom: '1rem' }}>Template Settings</h3>
          <div style={{ marginBottom: '1rem' }}>
            <select 
              value={data.template} 
              onChange={(e) => setData(prev => ({ ...prev, template: e.target.value }))}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', fontSize: '1rem' }}
            >
              <option value="modern">Modern Professional</option>
              <option value="minimal">Minimal ATS</option>
              <option value="fresher">Skills-First Fresher</option>
              <option value="compact">Compact Tech Resume</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="checkbox" 
              id="show-photo-toggle" 
              checked={data.showProfilePhoto} 
              onChange={(e) => setData(prev => ({ ...prev, showProfilePhoto: e.target.checked }))} 
              style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            />
            <label htmlFor="show-photo-toggle" style={{ cursor: 'pointer', fontWeight: 500 }}>Show Profile Photo</label>
          </div>
        </section>

        <button className="btn-outline" onClick={() => setIsAtsModalOpen(true)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: '600' }}>
          <FileSearch size={20} /> Analyze ATS Score
        </button>

        <button className="btn-primary" onClick={downloadPDF} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Download size={20} /> Download PDF
        </button>
      </aside>

      {/* Preview Pane */}
      <main className="preview-pane">
        <div className={`resume-paper template-${data.template}`} ref={resumeRef}>
          {data.template === 'modern' && <ModernTemplate data={data} formatUrl={formatUrl} />}
          {data.template === 'minimal' && <MinimalTemplate data={data} formatUrl={formatUrl} />}
          {data.template === 'fresher' && <FresherTemplate data={data} formatUrl={formatUrl} />}
          {data.template === 'compact' && <CompactTemplate data={data} formatUrl={formatUrl} />}
        </div>
      </main>

      {/* ATS Analyzer Modal */}
      <AtsAnalyzer 
        isOpen={isAtsModalOpen} 
        onClose={() => setIsAtsModalOpen(false)} 
        resumeData={data} 
      />
    </div>
  )
}

export default App
