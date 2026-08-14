import React, { useState, useEffect, useRef } from 'react';

export default function CommandPalette({ isOpen, onClose, onNavigate, onShowToast, onOpenArchive }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    {
      id: 'cv-download',
      category: 'Resume & Actions',
      title: 'Download Resume / CV (PDF)',
      subtitle: 'Official Resume of Divakar Pandey',
      icon: '📄',
      shortcut: 'CV',
      perform: () => {
        const link = document.createElement('a');
        link.href = '/Divakar_Cv.pdf';
        link.download = 'Divakar_Pandey_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onShowToast('Resume download started! 📄', '📥');
      }
    },
    {
      id: 'cv-preview',
      category: 'Resume & Actions',
      title: 'View Resume in New Tab',
      subtitle: 'Open PDF viewer directly',
      icon: '👁️',
      perform: () => {
        window.open('/Divakar_Cv.pdf', '_blank');
        onShowToast('Opening resume preview...', '👁️');
      }
    },
    {
      id: 'nav-hero',
      category: 'Navigation',
      title: 'Go to Home / Exhibition',
      subtitle: 'Hero Section',
      icon: '🏠',
      perform: () => onNavigate('hero')
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'Go to About Me & Philosophy',
      subtitle: 'Bio, Experience & Engineering Mindset',
      icon: '👤',
      perform: () => onNavigate('about')
    },
    {
      id: 'nav-education',
      category: 'Navigation',
      title: 'Go to Education & Skills',
      subtitle: 'Degrees, Universities & Tech Stack',
      icon: '🎓',
      perform: () => onNavigate('education-skills')
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Go to Featured Projects',
      subtitle: 'digital-pateri, BharatYatra, NightShield & IoT',
      icon: '💼',
      perform: () => onNavigate('featured-projects')
    },
    {
      id: 'nav-certifications',
      category: 'Navigation',
      title: 'Go to Certifications & Events',
      subtitle: 'Workshops, NIIT Java, InnoStart',
      icon: '🏆',
      perform: () => onNavigate('certifications')
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Go to Contact / Get In Touch',
      subtitle: 'Email, Phone & Social Channels',
      icon: '✉️',
      perform: () => onNavigate('contact')
    },
    {
      id: 'archive-projects',
      category: 'Archives',
      title: 'View Full Project Gallery (8 Projects)',
      subtitle: 'Complete catalogue with tech breakdowns',
      icon: '🚀',
      perform: () => onOpenArchive('projects-archive')
    },
    {
      id: 'archive-education',
      category: 'Archives',
      title: 'View Full Academic Timeline',
      subtitle: 'MCA, BCA, PGDCA, B.Sc & O-Level',
      icon: '📚',
      perform: () => onOpenArchive('education-archive')
    },
    {
      id: 'copy-email',
      category: 'Quick Contact',
      title: 'Copy Email Address',
      subtitle: 'pandeydivakar07@gmail.com',
      icon: '📬',
      perform: () => {
        navigator.clipboard.writeText('pandeydivakar07@gmail.com');
        onShowToast('Email copied to clipboard! 📋', '✅');
      }
    },
    {
      id: 'copy-phone',
      category: 'Quick Contact',
      title: 'Copy Phone Number',
      subtitle: '+91 6394163494',
      icon: '📱',
      perform: () => {
        navigator.clipboard.writeText('+916394163494');
        onShowToast('Phone number copied! 📋', '✅');
      }
    },
    {
      id: 'open-github',
      category: 'Socials',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/divakarpandey07',
      icon: '🐙',
      perform: () => window.open('https://github.com/divakarpandey07', '_blank')
    },
    {
      id: 'open-linkedin',
      category: 'Socials',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/divakar6394163494',
      icon: '🔗',
      perform: () => window.open('https://www.linkedin.com/in/divakar6394163494/', '_blank')
    },
    {
      id: 'theme-gold',
      category: 'Theme Accents',
      title: 'Switch Accent: Classic Cyber Gold',
      subtitle: 'Warm luxury aesthetic',
      icon: '🟡',
      perform: () => {
        document.documentElement.style.setProperty('--accent-gold', '#bda07a');
        document.documentElement.style.setProperty('--accent-gold-hover', '#e8d3b9');
        onShowToast('Theme accent: Cyber Gold', '🟡');
      }
    },
    {
      id: 'theme-cyan',
      category: 'Theme Accents',
      title: 'Switch Accent: Electric Cyan',
      subtitle: 'Futuristic sci-fi vibe',
      icon: '🔵',
      perform: () => {
        document.documentElement.style.setProperty('--accent-gold', '#00f0ff');
        document.documentElement.style.setProperty('--accent-gold-hover', '#70f8ff');
        onShowToast('Theme accent: Electric Cyan', '🔵');
      }
    },
    {
      id: 'theme-emerald',
      category: 'Theme Accents',
      title: 'Switch Accent: Matrix Emerald',
      subtitle: 'Clean cyber green',
      icon: '🟢',
      perform: () => {
        document.documentElement.style.setProperty('--accent-gold', '#00e699');
        document.documentElement.style.setProperty('--accent-gold-hover', '#66ffcc');
        onShowToast('Theme accent: Matrix Emerald', '🟢');
      }
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].perform();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-header">
          <span className="cmd-search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search (e.g. about, resume, projects)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="cmd-esc-badge" onClick={onClose}>ESC</kbd>
        </div>

        <div className="cmd-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No matching commands found.</div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => {
                  item.perform();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="cmd-item-left">
                  <span className="cmd-item-icon">{item.icon}</span>
                  <div>
                    <div className="cmd-item-title">{item.title}</div>
                    <div className="cmd-item-subtitle">{item.subtitle}</div>
                  </div>
                </div>
                <div className="cmd-item-right">
                  <span className="cmd-category-tag">{item.category}</span>
                  {item.shortcut && <kbd className="cmd-kbd">{item.shortcut}</kbd>}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵ Enter</kbd></span>
          <span>Close with <kbd>Esc</kbd></span>
        </div>
      </div>
    </div>
  );
}
