import React, { useState, useEffect } from 'react';

const THEMES = [
  { id: 'gold', name: 'Cyber Gold', color: '#bda07a', hover: '#e8d3b9' },
  { id: 'cyan', name: 'Electric Cyan', color: '#00f0ff', hover: '#70f8ff' },
  { id: 'emerald', name: 'Matrix Emerald', color: '#00e699', hover: '#66ffcc' },
  { id: 'violet', name: 'Neon Violet', color: '#b366ff', hover: '#d4a6ff' }
];

export default function ThemeSwitcher({ onShowToast }) {
  const [currentTheme, setCurrentTheme] = useState('gold');

  useEffect(() => {
    const saved = localStorage.getItem('divakar_portfolio_theme');
    if (saved) {
      const match = THEMES.find((t) => t.id === saved);
      if (match) {
        applyTheme(match, false);
      }
    }
  }, []);

  const applyTheme = (t, notify = true) => {
    setCurrentTheme(t.id);
    document.documentElement.style.setProperty('--accent-gold', t.color);
    document.documentElement.style.setProperty('--accent-gold-hover', t.hover);
    localStorage.setItem('divakar_portfolio_theme', t.id);
    if (notify && onShowToast) {
      onShowToast(`Theme accent: ${t.name}`, '🎨');
    }
  };

  return (
    <div className="theme-switcher-bar" title="Change Theme Accent">
      <span className="theme-switcher-label">Accent:</span>
      <div className="theme-dots-group">
        {THEMES.map((t) => (
          <button
            key={t.id}
            className={`theme-dot-btn ${currentTheme === t.id ? 'active' : ''}`}
            style={{ backgroundColor: t.color }}
            onClick={() => applyTheme(t)}
            title={t.name}
            aria-label={`Switch to ${t.name} theme`}
          />
        ))}
      </div>
    </div>
  );
}
