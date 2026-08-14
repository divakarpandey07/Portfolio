import React from 'react';

export default function MobileNav({ activeSection, onNavigate, onOpenCommandPalette }) {
  const navItems = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'education-skills', label: 'Skills', icon: '⚡' },
    { id: 'featured-projects', label: 'Work', icon: '💼' },
    { id: 'certifications', label: 'Certs', icon: '🏆' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
  ];

  return (
    <nav className="mobile-dock" aria-label="Mobile Navigation Dock">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`mobile-dock-item ${activeSection === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
          aria-label={item.label}
        >
          <span className="dock-icon">{item.icon}</span>
          <span className="dock-label">{item.label}</span>
        </button>
      ))}

      <button
        className="mobile-dock-item cv-highlight"
        onClick={() => {
          const link = document.createElement('a');
          link.href = '/Divakar_Cv.pdf';
          link.download = 'Divakar_Pandey_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        aria-label="Download Resume"
      >
        <span className="dock-icon">📄</span>
        <span className="dock-label">CV</span>
      </button>

      <button
        className="mobile-dock-item cmd-trigger"
        onClick={onOpenCommandPalette}
        aria-label="Search and Actions"
      >
        <span className="dock-icon">🔍</span>
        <span className="dock-label">⌘K</span>
      </button>
    </nav>
  );
}
