import React from 'react';

export const RECRUITER_ROLES = [
  {
    id: 'all',
    title: 'All Disciplines',
    subtitle: 'Complete Full-Stack, AI, Android & IoT Portfolio',
    targetSkills: [],
    targetProjects: []
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Architect',
    subtitle: 'Tailored for React, Node.js, Express, MongoDB & AI Systems',
    targetSkills: ['React.js', 'Node.js', 'Gemini AI', 'MongoDB', 'TypeScript', 'Git & GitHub'],
    targetProjects: ['digital-pateri', 'bharat-yatra', 'carbon-tracker']
  },
  {
    id: 'backend',
    title: 'Backend & Java Engineer',
    subtitle: 'Tailored for Java, Relational MySQL, REST APIs & Distributed Logic',
    targetSkills: ['Java', 'Node.js', 'SQL / MySQL', 'MongoDB', 'Git & GitHub'],
    targetProjects: ['digital-pateri', 'nightshield', 'saanidhya']
  },
  {
    id: 'android',
    title: 'Android & Security',
    subtitle: 'Tailored for Java Android, AES-256 Cryptography & Firebase Sync',
    targetSkills: ['Java', 'Android Studio', 'Git & GitHub'],
    targetProjects: ['nightshield']
  },
  {
    id: 'iot',
    title: 'IoT & Embedded Systems',
    subtitle: 'Tailored for ESP32, NodeMCU, C++ Firmware & Cloud Telemetry',
    targetSkills: ['ESP32 / IoT', 'C++', 'Git & GitHub'],
    targetProjects: ['iot-classroom']
  }
];

export default function RoleFilterBar({ activeRole, onSelectRole }) {
  const currentRoleObj = RECRUITER_ROLES.find((r) => r.id === activeRole) || RECRUITER_ROLES[0];

  return (
    <div className="role-tailor-container">
      <div className="role-tailor-header">
        <span className="accent-text" style={{ fontSize: '0.65rem' }}>TARGET ROLE RECRUITER MODE</span>
        <span className="role-status-badge">ACTIVE VIEW: {currentRoleObj.title.toUpperCase()}</span>
      </div>

      <div className="role-pills-wrapper">
        {RECRUITER_ROLES.map((role) => (
          <button
            key={role.id}
            className={`role-pill-btn ${activeRole === role.id ? 'active' : ''}`}
            onClick={() => onSelectRole(role.id)}
            title={role.subtitle}
          >
            {role.title}
          </button>
        ))}
      </div>

      {activeRole !== 'all' && (
        <div className="role-summary-banner">
          <span><strong>Focused on:</strong> {currentRoleObj.subtitle}</span>
          <button className="role-reset-btn" onClick={() => onSelectRole('all')}>
            Reset to All
          </button>
        </div>
      )}
    </div>
  );
}
