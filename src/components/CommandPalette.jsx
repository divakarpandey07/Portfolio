import React, { useState, useEffect, useRef } from 'react';

export default function CommandPalette({ isOpen, onClose, onNavigate, onShowToast, onOpenArchive, onOpenPitch }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    {
      id: 'cv-download',
      category: 'Resume & Actions',
      title: 'Download Resume / CV (PDF)',
      subtitle: 'Official Resume of Divakar Pandey',
      shortcut: 'CV',
      perform: () => {
        const link = document.createElement('a');
        link.href = '/Divakar_Cv.pdf';
        link.download = 'Divakar_Pandey_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onShowToast('Resume download started');
      }
    },
    {
      id: 'recruiter-pitch',
      category: 'Resume & Actions',
      title: '60-Second Executive Recruiter Pitch',
      subtitle: 'Instant candidate merit, academic scores & top projects',
      shortcut: 'PITCH',
      perform: () => {
        onClose();
        if (onOpenPitch) onOpenPitch();
      }
    },
    {
      id: 'cv-preview',
      category: 'Resume & Actions',
      title: 'View Resume in New Tab',
      subtitle: 'Open PDF viewer directly',
      perform: () => {
        window.open('/Divakar_Cv.pdf', '_blank');
        onShowToast('Opening resume preview...');
      }
    },
    {
      id: 'nav-hero',
      category: 'Navigation',
      title: 'Go to Home / Exhibition',
      subtitle: 'Hero Section',
      perform: () => onNavigate('hero')
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'Go to About Me & Philosophy',
      subtitle: 'Bio, Experience & Engineering Mindset',
      perform: () => onNavigate('about')
    },
    {
      id: 'nav-education',
      category: 'Navigation',
      title: 'Go to Education & Skills',
      subtitle: 'Degrees, Universities & Tech Stack',
      perform: () => onNavigate('education-skills')
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Go to Featured Projects',
      subtitle: 'digital-pateri, BharatYatra, NightShield & IoT',
      perform: () => onNavigate('featured-projects')
    },
    {
      id: 'nav-certifications',
      category: 'Navigation',
      title: 'Go to Certificates and more',
      subtitle: 'Workshops, NIIT Java, InnoStart',
      perform: () => onNavigate('certifications')
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Go to Contact / Get In Touch',
      subtitle: 'Email, Phone & Social Channels',
      perform: () => onNavigate('contact')
    },
    {
      id: 'archive-projects',
      category: 'Archives',
      title: 'View Full Project Gallery (8 Projects)',
      subtitle: 'Complete catalogue with tech breakdowns',
      perform: () => onOpenArchive('projects-archive')
    },
    {
      id: 'archive-education',
      category: 'Archives',
      title: 'View Full Academic Timeline',
      subtitle: 'MCA, BCA, PGDCA, B.Sc & O-Level',
      perform: () => onOpenArchive('education-archive')
    },
    {
      id: 'copy-email',
      category: 'Quick Contact',
      title: 'Copy Email Address',
      subtitle: 'pandeydivakar07@gmail.com',
      perform: () => {
        navigator.clipboard.writeText('pandeydivakar07@gmail.com');
        onShowToast('Email copied to clipboard');
      }
    },
    {
      id: 'copy-phone',
      category: 'Quick Contact',
      title: 'Copy Phone Number',
      subtitle: '+91 6394163494',
      perform: () => {
        navigator.clipboard.writeText('+916394163494');
        onShowToast('Phone number copied');
      }
    },
    {
      id: 'open-github',
      category: 'Socials',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/divakarpandey07',
      perform: () => window.open('https://github.com/divakarpandey07', '_blank')
    },
    {
      id: 'open-linkedin',
      category: 'Socials',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/divakar6394163494',
      perform: () => window.open('https://www.linkedin.com/in/divakar6394163494/', '_blank')
    }
  ];

  const filtered = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].perform();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-header">
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search sections..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <span className="cmd-esc-badge" onClick={onClose}>ESC</span>
        </div>

        <div className="cmd-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No commands found for "{query}"</div>
          ) : (
            filtered.map((act, index) => (
              <div
                key={act.id}
                className={`cmd-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => {
                  act.perform();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="cmd-item-left">
                  <div>
                    <div className="cmd-item-title">{act.title}</div>
                    <div className="cmd-item-subtitle">{act.subtitle}</div>
                  </div>
                </div>
                <div className="cmd-item-right">
                  <span className="cmd-category-tag">{act.category}</span>
                  {act.shortcut && <kbd className="cmd-kbd">{act.shortcut}</kbd>}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>Enter</kbd></span>
          <span>Close with <kbd>ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
