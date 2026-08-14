import React, { useState, useEffect } from 'react';

const WORDS = [
  'Full-Stack Systems Architect',
  'Applied AI & Gemini API Developer',
  'Mobile Cryptography & Security Engineer',
  'IoT & Embedded Hardware Innovator',
  'MCA Candidate @ Lovely Professional University'
];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === WORDS[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 30 : 65);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting]);

  return (
    <div className="typewriter-container" aria-label="Role Tagline">
      <span className="typewriter-prefix">&gt; </span>
      <span className="typewriter-text">{WORDS[index].substring(0, subIndex)}</span>
      <span className="typewriter-cursor">|</span>
    </div>
  );
}
