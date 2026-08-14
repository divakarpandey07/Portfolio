import React from 'react';

export default function MobileNav({ activeSection, onNavigate, onOpenCommandPalette }) {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education-skills', label: 'Skills' },
    { id: 'featured-projects', label: 'Work' },
    { id: 'certifications', label: 'Certs' },
    { id: 'contact', label: 'Contact' },
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
        <span className="dock-label">CV</span>
      </button>

      <button
        className="mobile-dock-item cmd-trigger"
        onClick={onOpenCommandPalette}
        aria-label="Search and Actions"
      >
        <span className="dock-label">⌘K</span>
      </button>
    </nav>
  );
}
