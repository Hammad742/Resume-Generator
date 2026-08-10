import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Lightbulb, UserCheck, RefreshCw, BarChart2 } from 'lucide-react';
import { analyzeResumeATS } from '../utils/ai';
import '../styles/AtsAnalyzer.css';

const AtsAnalyzer = ({ isOpen, onClose, resumeData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (isOpen && !result && !isLoading) {
      handleAnalyze();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  async function handleAnalyze() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeResumeATS(resumeData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="ats-modal-overlay" onClick={onClose}>
      <div className="ats-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ats-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 size={24} color="var(--primary)" />
            <h2>AI Resume Analysis</h2>
          </div>
          <button className="ats-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="ats-modal-body">
          {isLoading && (
            <div className="ats-loading-state">
              <RefreshCw className="ats-spinner" size={40} />
              <p>Analyzing resume against ATS standards...</p>
              <span className="ats-loading-subtext">This uses Gemini AI and may take a few seconds.</span>
            </div>
          )}

          {error && !isLoading && (
            <div className="ats-error-state">
              <AlertTriangle size={40} color="#e53e3e" />
              <p className="ats-error-msg">{error}</p>
              <button className="btn-primary" onClick={handleAnalyze}>Try Again</button>
            </div>
          )}

          {result && !isLoading && !error && (
            <div className="ats-results">
              {/* Score Card */}
              <div className="ats-score-card">
                <div className="ats-score-circle">
                  <span className="ats-score-number">{result.atsScore || 0}</span>
                  <span className="ats-score-max">/100</span>
                </div>
                <div className="ats-score-info">
                  <h3>Estimated ATS Score</h3>
                  <p>Based on keyword density, section completeness, and readability.</p>
                </div>
              </div>

              <div className="ats-feedback-grid">
                {/* Strengths */}
                <div className="ats-feedback-card ats-strengths">
                  <h4><CheckCircle size={18} /> Resume Strengths</h4>
                  <ul>
                    {(result.strengths || []).map((item, idx) => <li key={idx}>{item}</li>)}
                    {(result.strengths || []).length === 0 && <li>No major strengths detected.</li>}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="ats-feedback-card ats-weaknesses">
                  <h4><AlertTriangle size={18} /> Improvement Areas</h4>
                  <ul>
                    {(result.weaknesses || []).map((item, idx) => <li key={idx}>{item}</li>)}
                    {(result.weaknesses || []).length === 0 && <li>No major weaknesses detected!</li>}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="ats-feedback-card ats-suggestions">
                  <h4><Lightbulb size={18} /> Actionable Suggestions</h4>
                  <ul>
                    {(result.suggestions || []).map((item, idx) => <li key={idx}>{item}</li>)}
                    {(result.suggestions || []).length === 0 && <li>No suggestions right now.</li>}
                  </ul>
                </div>

                {/* Missing Keywords */}
                <div className="ats-feedback-card ats-keywords">
                  <h4><BarChart2 size={18} /> Missing Keywords</h4>
                  <div className="ats-keyword-tags">
                    {(result.missingKeywords || []).map((item, idx) => <span key={idx} className="ats-keyword-tag">{item}</span>)}
                    {(result.missingKeywords || []).length === 0 && <span className="ats-keyword-tag">Great keyword coverage!</span>}
                  </div>
                </div>
              </div>

              {/* Recruiter Feedback */}
              <div className="ats-recruiter-feedback">
                <h4><UserCheck size={18} /> Simulated Recruiter Feedback</h4>
                <p>"{result.recruiterFeedback || "Analysis generated. Please review the points above."}"</p>
              </div>
            </div>
          )}
        </div>
        
        {result && !isLoading && !error && (
          <div className="ats-modal-footer">
            <button className="btn-outline" onClick={handleAnalyze}>
              <RefreshCw size={16} /> Re-analyze
            </button>
            <button className="btn-primary" onClick={onClose}>Got it</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtsAnalyzer;
