import React, { useState, useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    setActiveStepIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && project?.architectureFlow) {
        setActiveStepIndex((prev) => Math.min(prev + 1, project.architectureFlow.length - 1));
      }
      if (e.key === 'ArrowLeft' && project?.architectureFlow) {
        setActiveStepIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentStep = project.architectureFlow && project.architectureFlow[activeStepIndex]
    ? project.architectureFlow[activeStepIndex]
    : null;

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="project-modal-header">
          <span className="accent-text" style={{ fontSize: '0.7rem' }}>CASE STUDY // DEEP DIVE</span>
          <h2 className="project-modal-title">{project.title}</h2>
          <div className="project-modal-meta">
            <span className="timeline-date">{project.date}</span>
            {project.categoryLabel && <span className="project-category-tag">{project.categoryLabel}</span>}
          </div>
        </div>

        {project.img && (
          <div className="project-modal-media">
            <img src={project.img} alt={`${project.title} preview`} className="project-modal-img" />
          </div>
        )}

        <div className="project-modal-body">
          <div className="project-modal-section">
            <h4>Overview &amp; Problem Statement</h4>
            <p>{project.longDesc || project.desc}</p>
          </div>

          {/* Interactive System Architecture Blueprint / Node Inspector */}
          {project.architectureFlow && project.architectureFlow.length > 0 && (
            <div className="project-modal-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4>Interactive System Architecture Blueprint</h4>
                <span className="arch-inspector-hint">Click a node to inspect payload &amp; telemetry</span>
              </div>

              {/* Node Pipeline Buttons */}
              <div className="arch-pipeline-container">
                {project.architectureFlow.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <button
                      type="button"
                      className={`arch-step-box interactive-node ${idx === activeStepIndex ? 'active-node' : ''}`}
                      onClick={() => setActiveStepIndex(idx)}
                      title={`Inspect ${step.title}`}
                    >
                      <span className="arch-step-num">0{idx + 1}</span>
                      <span className="arch-step-title">{step.title}</span>
                      <span className="arch-step-detail">{step.detail}</span>
                    </button>
                    {idx < project.architectureFlow.length - 1 && (
                      <div className="arch-connector">→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Node Inspector Deep Dive Box */}
              {currentStep && (
                <div className="arch-node-inspector">
                  <div className="inspector-top-row">
                    <div>
                      <span className="inspector-badge">STAGE 0{activeStepIndex + 1} INSPECTOR</span>
                      <span className="inspector-node-name">{currentStep.title}</span>
                    </div>
                    <div className="inspector-telemetry-tags">
                      {currentStep.latency && (
                        <span className="inspector-tag latency">Latency: {currentStep.latency}</span>
                      )}
                      {currentStep.security && (
                        <span className="inspector-tag security">Protocol: {currentStep.security}</span>
                      )}
                    </div>
                  </div>

                  <p className="inspector-spec-text">
                    {currentStep.spec || currentStep.detail}
                  </p>

                  <div className="inspector-nav-bar">
                    <button
                      className="inspector-nav-btn"
                      disabled={activeStepIndex === 0}
                      onClick={() => setActiveStepIndex((prev) => Math.max(prev - 1, 0))}
                    >
                      ← Previous Node
                    </button>
                    <span className="inspector-step-indicator">
                      Step {activeStepIndex + 1} of {project.architectureFlow.length}
                    </span>
                    <button
                      className="inspector-nav-btn"
                      disabled={activeStepIndex === project.architectureFlow.length - 1}
                      onClick={() => setActiveStepIndex((prev) => Math.min(prev + 1, project.architectureFlow.length - 1))}
                    >
                      Next Node →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="project-modal-section">
              <h4>Key Engineering Highlights</h4>
              <ul className="project-modal-list">
                {project.highlights.map((point, idx) => (
                  <li key={idx}>
                    <span className="highlight-bullet">•</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="project-modal-section">
            <h4>Technologies &amp; Libraries</h4>
            <div className="badge-container" style={{ opacity: 1, transform: 'none', marginTop: '10px' }}>
              {project.tech.map((t, idx) => (
                <span key={idx} className="badge">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="project-modal-footer">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn primary"
            >
              <span>Launch Live Platform</span>
            </a>
          )}
          {project.git && (
            <a
              href={project.git}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn secondary"
            >
              <span>View GitHub Source</span>
            </a>
          )}
          <button className="modal-action-btn outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
