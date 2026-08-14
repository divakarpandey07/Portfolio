import React from 'react';
import { IconGitHub, IconExternalLink } from './UiIcons';

export default function GithubStatsCard() {
  const languages = [
    { name: 'JavaScript & React', pct: 36, color: '#f7df1e' },
    { name: 'Java & Android', pct: 24, color: '#b07219' },
    { name: 'Python & AI (Gemini)', pct: 20, color: '#3572A5' },
    { name: 'C++ & ESP32 IoT', pct: 12, color: '#f34b7d' },
    { name: 'PHP & MySQL', pct: 8, color: '#4F5D95' }
  ];

  return (
    <div className="github-stats-card">
      <div className="github-stats-header">
        <div className="github-user-info">
          <span className="github-icon"><IconGitHub size={26} /></span>
          <div>
            <div className="github-username">divakarpandey07</div>
            <div className="github-subtitle">GitHub Open-Source Contributions &amp; Codebase</div>
          </div>
        </div>

        <a
          href="https://github.com/divakarpandey07"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-small github-cta-btn"
        >
          <span>Explore Repositories</span>
          <IconExternalLink size={13} style={{ marginLeft: '4px' }} />
        </a>
      </div>

      {/* Language Distribution Progress Bar */}
      <div className="github-lang-bar-container">
        <div className="github-lang-bar">
          {languages.map((lang, idx) => (
            <div
              key={idx}
              className="github-lang-segment"
              style={{ width: `${lang.pct}%`, backgroundColor: lang.color }}
              title={`${lang.name}: ${lang.pct}%`}
            />
          ))}
        </div>
      </div>

      {/* Language Legends */}
      <div className="github-lang-legends">
        {languages.map((lang, idx) => (
          <div key={idx} className="github-legend-item">
            <span className="legend-dot" style={{ backgroundColor: lang.color }} />
            <span className="legend-name">{lang.name}</span>
            <span className="legend-pct">{lang.pct}%</span>
          </div>
        ))}
      </div>

      <div className="github-metrics-strip">
        <div className="github-metric-box">
          <span className="metric-val">8+</span>
          <span className="metric-lbl">Public Repos</span>
        </div>
        <div className="github-metric-box">
          <span className="metric-val">100%</span>
          <span className="metric-lbl">Open Source</span>
        </div>
        <div className="github-metric-box">
          <span className="metric-val">3+</span>
          <span className="metric-lbl">Production Apps</span>
        </div>
      </div>
    </div>
  );
}
