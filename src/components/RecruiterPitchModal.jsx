import React, { useEffect } from 'react';
import { IconDocument, IconMail, IconAward, IconCode, IconBriefcase } from './UiIcons';

export default function RecruiterPitchModal({ isOpen, onClose, onDownloadCV, onNavigateToContact }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="recruiter-pitch-card" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose} aria-label="Close pitch">
          ✕
        </button>

        <div className="pitch-header">
          <div className="pitch-badge-pill">
            <span className="live-status-dot"></span>
            <span>EXECUTIVE CANDIDATE SUMMARY • 60-SEC PITCH</span>
          </div>
          <h2 className="pitch-title">Divakar Pandey</h2>
          <p className="pitch-subtitle">Full-Stack Software Engineer &amp; MCA Candidate @ Lovely Professional University</p>
        </div>

        <div className="pitch-grid">
          {/* Section 1: Academic & Readiness */}
          <div className="pitch-block">
            <div className="pitch-block-title">
              <IconAward size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Education &amp; Academic Merit
            </div>
            <div className="pitch-metric-row">
              <div className="pitch-stat">
                <span className="p-stat-val">7.36</span>
                <span className="p-stat-lbl">MCA CGPA (LPU)</span>
              </div>
              <div className="pitch-stat">
                <span className="p-stat-val">70%</span>
                <span className="p-stat-lbl">BCA Degree</span>
              </div>
              <div className="pitch-stat">
                <span className="p-stat-val">2026</span>
                <span className="p-stat-lbl">MCA Graduation</span>
              </div>
            </div>
          </div>

          {/* Section 2: Core Engineering Pillars */}
          <div className="pitch-block">
            <div className="pitch-block-title">
              <IconCode size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Core Engineering Stack
            </div>
            <div className="pitch-tags-group">
              <span className="pitch-tag">React.js &amp; Vite</span>
              <span className="pitch-tag">Node.js / Express</span>
              <span className="pitch-tag">Java &amp; Android</span>
              <span className="pitch-tag">Google Gemini AI</span>
              <span className="pitch-tag">ESP32 &amp; IoT</span>
              <span className="pitch-tag">MongoDB &amp; MySQL</span>
              <span className="pitch-tag">Python (ML)</span>
              <span className="pitch-tag">AES-256 Crypto</span>
            </div>
          </div>
        </div>

        {/* Section 3: Top 3 Flagship Projects */}
        <div className="pitch-flagships">
          <div className="pitch-block-title">
            <IconBriefcase size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Top 3 Flagship Engineering Works
          </div>
          <div className="pitch-projects-list">
            <div className="pitch-proj-item">
              <div className="pitch-proj-header">
                <strong>1. digital-pateri</strong>
                <span className="pitch-proj-badge">Full-Stack &amp; AI</span>
              </div>
              <p className="pitch-proj-desc">
                Smart Gram Panchayat citizen governance portal deployed for real village administration with Gemini AI automated civic ticket routing and tamper-proof document vaults.
              </p>
            </div>

            <div className="pitch-proj-item">
              <div className="pitch-proj-header">
                <strong>2. NightShield</strong>
                <span className="pitch-proj-badge">Mobile Security</span>
              </div>
              <p className="pitch-proj-desc">
                Android cryptographic messaging app built with Java &amp; Android Studio featuring client-side AES-256 encryption and real-time Firebase syncing.
              </p>
            </div>

            <div className="pitch-proj-item">
              <div className="pitch-proj-header">
                <strong>3. IoT Digital Classroom</strong>
                <span className="pitch-proj-badge">Hardware &amp; IoT</span>
              </div>
              <p className="pitch-proj-desc">
                Automated smart attendance &amp; climate control system powered by ESP32/NodeMCU microcontrollers, RFID RC522 verification, and cloud telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Availability & Action Buttons */}
        <div className="pitch-footer">
          <div className="pitch-availability">
            <span className="live-status-dot" style={{ width: '8px', height: '8px', marginRight: '6px' }}></span>
            <span><strong>Status:</strong> Immediate Joining | Open for Full-Time Software Engineering &amp; Full-Stack Roles</span>
          </div>

          <div className="pitch-actions">
            <button className="btn-primary" onClick={onDownloadCV}>
              <IconDocument size={16} />
              <span>Download Official Resume (PDF)</span>
            </button>
            <button
              className="btn-outline"
              onClick={() => {
                onClose();
                onNavigateToContact();
              }}
            >
              <IconMail size={16} />
              <span>Schedule Interview / Contact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
