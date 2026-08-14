import React from 'react';

export default function TechIcon({ name, size = 18, className = '' }) {
  const norm = name.toLowerCase();

  if (norm.includes('react')) {
    return (
      <svg width={size} height={size} viewBox="0 0 115.3 100" fill="none" className={`tech-svg-icon ${className}`}>
        <ellipse cx="57.65" cy="50" rx="55" ry="21" stroke="#61DAFB" strokeWidth="6" transform="rotate(30 57.65 50)" />
        <ellipse cx="57.65" cy="50" rx="55" ry="21" stroke="#61DAFB" strokeWidth="6" transform="rotate(90 57.65 50)" />
        <ellipse cx="57.65" cy="50" rx="55" ry="21" stroke="#61DAFB" strokeWidth="6" transform="rotate(150 57.65 50)" />
        <circle cx="57.65" cy="50" r="10" fill="#61DAFB" />
      </svg>
    );
  }

  if (norm.includes('node')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`tech-svg-icon ${className}`}>
        <path d="M16 2L3 9.5V22.5L16 30L29 22.5V9.5L16 2Z" stroke="#68A063" strokeWidth="2.5" strokeLinejoin="round" fill="rgba(104,160,99,0.15)" />
        <path d="M16 9V23M9 13L23 21" stroke="#68A063" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('gemini') || norm.includes('ai')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="url(#gemini-grad)" />
        <defs>
          <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4E82EE" />
            <stop offset="0.5" stopColor="#9C6CEE" />
            <stop offset="1" stopColor="#E95B83" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (norm.includes('java') && !norm.includes('script')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <path d="M9 19C14 19 18 17.5 18 16C18 14.5 14 13.5 9 13.5" stroke="#E76F00" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 21C13 21 19 19.5 19 18C19 16.5 13 15.5 7 15.5" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 2C10 5 14 7 12 10" stroke="#E76F00" strokeWidth="2" strokeLinecap="round" />
        <path d="M15 4C13 7 17 9 15 12" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('android')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <path d="M5 14V19M19 14V19M7 10V20C7 20.6 7.4 21 8 21H16C16.6 21 17 20.6 17 20V10M6 10H18M16 4L17.5 2M8 4L6.5 2M7 9C7 6.2 9.2 4 12 4C14.8 4 17 6.2 17 9H7Z" stroke="#3DDC84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="7" r="1" fill="#3DDC84" />
        <circle cx="14" cy="7" r="1" fill="#3DDC84" />
      </svg>
    );
  }

  if (norm.includes('python')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <path d="M11.5 2C7.5 2 7.5 3.5 7.5 3.5V6H12.5V7H5.5C5.5 7 2 7 2 11C2 15 5 15 5 15H6.5V13C6.5 11 8.5 11 8.5 11H13.5C15 11 16 10 16 8.5V4C16 2.5 14 2 11.5 2ZM9.5 3.5C10 3.5 10.5 4 10.5 4.5C10.5 5 10 5.5 9.5 5.5C9 5.5 8.5 5 8.5 4.5C8.5 4 9 3.5 9.5 3.5Z" fill="#3776AB" />
        <path d="M12.5 22C16.5 22 16.5 20.5 16.5 20.5V18H11.5V17H18.5C18.5 17 22 17 22 13C22 9 19 9 19 9H17.5V11C17.5 13 15.5 13 15.5 13H10.5C9 13 8 14 8 15.5V20C8 21.5 10 22 12.5 22ZM14.5 20.5C14 20.5 13.5 20 13.5 19.5C13.5 19 14 18.5 14.5 18.5C15 18.5 15.5 19 15.5 19.5C15.5 20 15 20.5 14.5 20.5Z" fill="#FFD43B" />
      </svg>
    );
  }

  if (norm.includes('c++') || norm.includes('cpp') || norm.includes('c/c++')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <path d="M11 6.5C8.5 6.5 6.5 8.5 6.5 12C6.5 15.5 8.5 17.5 11 17.5C12.5 17.5 13.8 16.8 14.5 15.8L12.5 14.5C12.1 15 11.6 15.5 11 15.5C9.6 15.5 8.5 14 8.5 12C8.5 10 9.6 8.5 11 8.5C11.6 8.5 12.1 9 12.5 9.5L14.5 8.2C13.8 7.2 12.5 6.5 11 6.5Z" fill="#00599C" />
        <path d="M15 11H17V9H18V11H20V12H18V14H17V12H15V11ZM19 11H21V9H22V11H24V12H22V14H21V12H19V11Z" fill="#00599C" transform="scale(0.85) translate(2, 2)" />
      </svg>
    );
  }

  if (norm.includes('esp32') || norm.includes('iot') || norm.includes('nodemcu')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <rect x="5" y="5" width="14" height="14" rx="2" stroke="#E63946" strokeWidth="2" fill="rgba(230,57,70,0.12)" />
        <circle cx="12" cy="12" r="3" fill="#E63946" />
        <path d="M12 2V5M12 19V22M2 12H5M19 12H22M6 2V5M6 19V22M18 2V5M18 19V22M2 6H5M19 6H22M2 18H5M19 18H22" stroke="#E63946" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('sql') || norm.includes('mysql')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#00758F" strokeWidth="2" fill="rgba(0,117,143,0.15)" />
        <path d="M3 5V12C3 13.66 7.03 15 12 15C16.97 15 21 13.66 21 12V5" stroke="#00758F" strokeWidth="2" />
        <path d="M3 12V19C3 20.66 7.03 22 12 22C16.97 22 21 20.66 21 19V12" stroke="#F29111" strokeWidth="2" />
      </svg>
    );
  }

  if (norm.includes('mongo')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <path d="M12 2C12 2 6 7 6 13C6 17.5 9 21 12 22C15 21 18 17.5 18 13C18 7 12 2 12 2Z" fill="rgba(71,162,72,0.2)" stroke="#47A248" strokeWidth="2" />
        <path d="M12 3V21" stroke="#47A248" strokeWidth="1.5" />
      </svg>
    );
  }

  if (norm.includes('typescript')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path d="M6 10H14M10 10V18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 16.5C14.5 17.5 15.5 18 17 18C18.5 18 19.5 17.2 19.5 16C19.5 14.5 18 14 16.5 13.5C15 13 14 12.5 14 11.2C14 10 15 9 16.8 9C18 9 19 9.5 19.5 10.5M14 16.5L14 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('git')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <path d="M21.7 10.7L13.3 2.3C12.9 1.9 12.3 1.9 11.9 2.3L9.5 4.7L12.3 7.5C13.1 7.2 14.1 7.4 14.7 8C15.4 8.7 15.6 9.7 15.2 10.5L17.9 13.2C18.7 12.8 19.7 13 20.4 13.7C21.2 14.5 21.2 15.8 20.4 16.6C19.6 17.4 18.3 17.4 17.5 16.6C16.9 16 16.7 15.1 17 14.3L14.4 11.7V17.3C14.6 17.5 14.8 17.8 14.8 18.2C14.8 19.3 13.9 20.2 12.8 20.2C11.7 20.2 10.8 19.3 10.8 18.2C10.8 17.4 11.3 16.7 12 16.4V10.7C11.3 10.4 10.8 9.7 10.8 8.9C10.8 8.5 10.9 8.2 11.1 7.9L8.4 5.2L2.3 11.3C1.9 11.7 1.9 12.3 2.3 12.7L10.7 21.1C11.1 21.5 11.7 21.5 12.1 21.1L21.7 11.5C22.1 11.1 22.1 10.5 21.7 10.7Z" fill="#F05032" />
      </svg>
    );
  }

  if (norm.includes('php')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
        <ellipse cx="12" cy="12" rx="10" ry="6" stroke="#777BB4" strokeWidth="2" fill="rgba(119,123,180,0.12)" />
        <path d="M8 10V14M8 10H10C10.8 10 11.5 10.5 11.5 11.2C11.5 12 10.8 12.5 10 12.5H8M14 10V14M14 10H16C16.8 10 17.5 10.5 17.5 11.2C17.5 12 16.8 12.5 16 12.5H14" stroke="#777BB4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Default Vector Terminal / Code Chip Icon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`tech-svg-icon ${className}`}>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="var(--accent-gold)" strokeWidth="2" />
      <path d="M7 9L10 12L7 15M12 15H17" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
