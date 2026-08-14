import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
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

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="project-modal-header">
          <span className="accent-text" style={{ fontSize: '0.7rem' }}>CASE STUDY // SPOTLIGHT</span>
          <h2 className="project-modal-title">{project.title}</h2>
          <div className="project-modal-meta">
            <span className="timeline-date">{project.date}</span>
            {project.category && <span className="project-category-badge">{project.category}</span>}
          </div>
        </div>

        {project.img && (
          <div className="project-modal-media">
            <img src={project.img} alt={`${project.title} preview`} className="project-modal-img" />
          </div>
        )}

        <div className="project-modal-body">
          <div className="project-modal-section">
            <h4>Overview &amp; Purpose</h4>
            <p>{project.longDesc || project.desc}</p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="project-modal-section">
              <h4>Key Architecture &amp; Features</h4>
              <ul className="project-modal-list">
                {project.highlights.map((point, idx) => (
                  <li key={idx}>
                    <span className="highlight-bullet">▹</span> {point}
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
              🚀 Launch Live Platform
            </a>
          )}
          {project.git && (
            <a
              href={project.git}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-btn secondary"
            >
              💻 View GitHub Source
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
