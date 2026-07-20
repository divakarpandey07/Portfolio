import React, { useEffect, useState, useRef } from 'react';
import ThreeScene from './ThreeScene';
import Lenis from 'lenis';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'education-skills', label: 'Education & Skills' },
  { id: 'featured-projects', label: 'Featured Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('main');

  // References for section elements
  const sectionRefs = {
    hero: useRef(null),
    'education-skills': useRef(null),
    'featured-projects': useRef(null),
    certifications: useRef(null),
    contact: useRef(null)
  };

  // Simulate premium loading screen
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
      setLoadingProgress(current);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Handle window scrolling and tracking active sections
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    window.lenis = lenis;

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Track scrolling updates through Lenis callbacks
    const handleScrollUpdate = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(Math.max(lenis.scroll / totalHeight, 0), 1);
      setScrollProgress(progress);
      document.documentElement.style.setProperty('--scroll', String(progress));

      // Track active viewport section
      let currentSection = 'hero';
      let minDiff = Infinity;
      const windowHeight = window.innerHeight;

      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const viewCenter = windowHeight / 2;
          const diff = Math.abs(sectionCenter - viewCenter);
          if (diff < minDiff) {
            minDiff = diff;
            currentSection = id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    lenis.on('scroll', handleScrollUpdate);
    
    // Initial trigger
    setTimeout(handleScrollUpdate, 100);

    const handleResize = () => {
      handleScrollUpdate();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Track mouse coordinates for custom cursor and parallax depth
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Calculate normalized mouse positions (-1 to 1) for WebGL scene
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      window.mx = normX;
      window.my = normY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('.glass-card') || 
        target.closest('.dot-wrapper') ||
        target.closest('.hud-nav-item') ||
        target.closest('.hud-logo');
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeMouseMove = null; // Clean react removal
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Magic Sparkle Cursor Trail generator
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      
      const particle = document.createElement('div');
      particle.className = 'sparkle-particle';
      
      const size = Math.random() * 4 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 40 + 20;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 800);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 3D Interactive Card Tilt & Glare Refraction effect
  useEffect(() => {
    const cards = document.querySelectorAll('.glass-card, .project-card');
    
    const handleMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const angleX = -(y - yc) / 30; // maximum tilt angle
      const angleY = (x - xc) / 30;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.01, 1.01, 1.01)`;
      
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);
      card.style.setProperty('--glare-opacity', '1');
    };
    
    const handleLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.setProperty('--glare-opacity', '0');
    };
    
    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
    });
    
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [view]);

  // Magnetic interactive elements (attract button center slightly to cursor)
  useEffect(() => {
    const magneticElements = document.querySelectorAll('.archive-view-more-btn, .archive-back-btn, .hud-logo');
    
    const handleMouseMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
    };
    
    const handleMouseLeave = (e) => {
      const el = e.currentTarget;
      el.style.transform = 'translate3d(0, 0, 0)';
    };
    
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      magneticElements.forEach((el) => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [view]);

  const scrollToSection = (id) => {
    const targetRef = sectionRefs[id];
    if (targetRef && targetRef.current) {
      if (window.lenis) {
        window.lenis.scrollTo(targetRef.current, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Premium Loader Overlay */}
      <div className={`loader-screen ${!loading ? 'hidden' : ''}`}>
        <div className="loader-logo">DIVAKAR<span>PANDEY</span></div>
        <div className="loader-bar-bg">
          <div className="loader-bar" style={{ width: `${loadingProgress}%` }}></div>
        </div>
        <div className="loader-number">{loadingProgress}%</div>
        <p className="loader-tip">LOADING EXHIBITION ROOM...</p>
      </div>

      {/* Floating Custom Cursor */}
      {!loading && (
        <div 
          className={`cursor-follower ${isHovering ? 'hovering' : ''}`}
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
        />
      )}

      <div className="app-shell">
        {/* Premium Feathered Header Blur Bar */}
        <div className="hud-bar" aria-hidden="true" />

        {/* Fixed 3D Canvas Background */}
        <div className="canvas-bg" aria-hidden="true">
          <ThreeScene modelPath="/model.glb" scrollProgress={scrollProgress} />
        </div>

        {view === 'main' ? (
          <>
            {/* Floating Top HUD Navigation */}
            <header className="hud">
              <div className="hud-logo" onClick={() => scrollToSection('hero')}>
                DIVAKAR
              </div>
              <nav className="hud-nav">
                {SECTIONS.map((sec) => (
                  <a 
                    key={sec.id}
                    className={`hud-nav-item ${activeSection === sec.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(sec.id)}
                    id={`nav-link-${sec.id}`}
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>
            </header>

            {/* Right Navigation Dots */}
            <div className="sidebar-dots" aria-label="Page Navigation">
              {SECTIONS.map((sec) => (
                <a 
                  key={sec.id}
                  className={`dot-wrapper ${activeSection === sec.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(sec.id)}
                  id={`dot-${sec.id}`}
                >
                  <span className="dot-label">{sec.label}</span>
                  <span className="dot"></span>
                </a>
              ))}
            </div>

            {/* Scroll Progress Bar at the bottom */}
            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>

            {/* Scrollable Content Sections */}
            <main className="overlays">
              {/* Section 1: Hero */}
              <section 
                id="hero" 
                ref={sectionRefs.hero}
                className={`scroll-section align-left ${activeSection === 'hero' ? 'visible' : ''}`}
              >
                <div className="glass-card">
                  <span className="accent-text line-wrapper">
                    <span className="reveal-line stagger-1">WELCOME TO THE EXHIBITION</span>
                  </span>
                  <h1 className="line-wrapper">
                    <span className="reveal-line stagger-2 shimmer-title">Creative</span>
                  </h1>
                  <h1 className="line-wrapper">
                    <span className="reveal-line stagger-3 shimmer-title">Developer.</span>
                  </h1>
                  
                  <div className="divider"></div>
                  
                  <p className="line-wrapper">
                    <span className="reveal-line stagger-4">I am Divakar, software engineer.</span>
                  </p>
                  <p className="line-wrapper">
                    <span className="reveal-line stagger-5">This portfolio is a journey through my workspace, projects, and certifications.</span>
                  </p>
                  
                  <div className="badge-container">
                    <span className="badge">Full-Stack Development</span>
                    <span className="badge">Machine Learning</span>
                    <span className="badge">IoT Systems</span>
                    <span className="badge">Android Development</span>
                  </div>
                  
                  <div className="hero-scroll-prompt">
                    <span className="scroll-arrow">↓</span>
                    <span>SCROLL DOWN TO EXPLORE</span>
                  </div>
                </div>
              </section>

              {/* Section 2: Education & Skills */}
              <section 
                id="education-skills" 
                ref={sectionRefs['education-skills']}
                className={`scroll-section align-right ${activeSection === 'education-skills' ? 'visible' : ''}`}
              >
                <div className="glass-card">
                  <span className="accent-text line-wrapper">
                    <span className="reveal-line stagger-1">JOURNEY &amp; CAPABILITIES</span>
                  </span>
                  <h2 className="line-wrapper">
                    <span className="reveal-line stagger-2">Education &amp; Skills</span>
                  </h2>
                  
                  <div className="divider"></div>
                  
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-date">2025 - Present</div>
                      <div className="timeline-title">Lovely Professional University</div>
                      <div className="timeline-subtitle">Master of Computer Applications (MCA) — <span className="accent-text" style={{ fontSize: '0.85rem' }}>CGPA: 7.36</span></div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">2023 - 2025</div>
                      <div className="timeline-title">National Institute of Electronics &amp; Information Technology</div>
                      <div className="timeline-subtitle">O Level Certificate (Varanasi, UP)</div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">2022 - 2025</div>
                      <div className="timeline-title">Veer Bahadur Singh Purvanchal University</div>
                      <div className="timeline-subtitle">Bachelor of Computer Applications (BCA) — <span className="accent-text" style={{ fontSize: '0.85rem' }}>70%</span></div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">2021 - 2022</div>
                      <div className="timeline-title">Mahatma Gandhi Kashi Vidyapith</div>
                      <div className="timeline-subtitle">Post Graduate Diploma in Computer Applications — <span className="accent-text" style={{ fontSize: '0.85rem' }}>56%</span></div>
                    </div>
                  </div>

                  <button 
                    className="archive-view-more-btn"
                    style={{ marginTop: '24px' }}
                    onClick={() => {
                      setView('education-archive');
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    View Full Academic History →
                  </button>

                  <div className="badge-container" style={{ marginTop: '36px', gap: '14px' }}>
                    <span className="bounce-badge"><span className="badge-emoji">⚙️</span> C++</span>
                    <span className="bounce-badge"><span className="badge-emoji">☕</span> Java</span>
                    <span className="bounce-badge"><span className="badge-emoji">🐍</span> Python</span>
                    <span className="bounce-badge"><span className="badge-emoji">🐘</span> PHP</span>
                    <span className="bounce-badge"><span className="badge-emoji">🟨</span> JavaScript</span>
                    <span className="bounce-badge"><span className="badge-emoji">⚛️</span> React.js</span>
                    <span className="bounce-badge"><span className="badge-emoji">🟢</span> Node.js</span>
                    <span className="bounce-badge"><span className="badge-emoji">💾</span> SQL</span>
                    <span className="bounce-badge"><span className="badge-emoji">🌿</span> Git</span>
                    <span className="bounce-badge"><span className="badge-emoji">🐙</span> GitHub</span>
                    <span className="bounce-badge"><span className="badge-emoji">🐧</span> Linux</span>
                    <span className="bounce-badge"><span className="badge-emoji">🤖</span> Android Studio</span>
                    <span className="bounce-badge"><span className="badge-emoji">🔌</span> Packet Tracer</span>
                    <span className="bounce-badge"><span className="badge-emoji">🧠</span> DSA</span>
                    <span className="bounce-badge"><span className="badge-emoji">🗄️</span> DBMS</span>
                    <span className="bounce-badge"><span className="badge-emoji">🧱</span> OOP</span>
                  </div>
                </div>
              </section>

              {/* Section 3: Featured Projects */}
              <section 
                id="featured-projects" 
                ref={sectionRefs['featured-projects']}
                className={`scroll-section align-left ${activeSection === 'featured-projects' ? 'visible' : ''}`}
              >
                <div className="glass-card">
                  <span className="accent-text line-wrapper">
                    <span className="reveal-line stagger-1">SELECTED WORK</span>
                  </span>
                  <h2 className="line-wrapper">
                    <span className="reveal-line stagger-2">Featured Projects</span>
                  </h2>
                  
                  <div className="divider"></div>
                  
                  <div className="project-scroll-container">
                    <div className="project-grid">
                      {/* Project 1: digital-pateri */}
                      <div className="project-card">
                        <h3>digital-pateri <span className="timeline-date" style={{ fontSize: '0.65rem', marginLeft: '10px' }}>(Apr - Jul 2026)</span></h3>
                        <p style={{ marginTop: '8px' }}>Smart Village Governance Portal for citizen services, grievance tickets, document vaults, and AI-assisted support in Pateri Gram Panchayat.</p>
                        <div className="project-image-container">
                          <img src="/digital_pateri_ss.png" alt="digital-pateri homepage screenshot" className="project-image" />
                        </div>
                        <div className="badge-container" style={{ marginTop: '12px' }}>
                          <span className="badge">React.js</span>
                          <span className="badge">Node.js</span>
                          <span className="badge">MongoDB</span>
                          <span className="badge">Gemini AI</span>
                        </div>
                        <div className="project-links">
                          <a href="https://digital-pateri.vercel.app" target="_blank" rel="noopener noreferrer" className="project-link" id="project-link-pateri">
                            🔗 Live Demo
                          </a>
                          <a href="https://github.com/divakarpandey07/digital-pateri" target="_blank" rel="noopener noreferrer" className="project-link" id="project-git-pateri">
                            💻 GitHub
                          </a>
                        </div>
                      </div>

                      {/* Project 2: BharatYatra */}
                      <div className="project-card" style={{ marginTop: '24px' }}>
                        <h3>BharatYatra <span className="timeline-date" style={{ fontSize: '0.65rem', marginLeft: '10px' }}>(2026)</span></h3>
                        <p style={{ marginTop: '8px' }}>A premium web application designed for interactive travel planning and destination discovery across India with rich visual media.</p>
                        <div className="project-image-container">
                          <img src="/bharat_yatra_ss.png" alt="BharatYatra homepage screenshot" className="project-image" />
                        </div>
                        <div className="badge-container" style={{ marginTop: '12px' }}>
                          <span className="badge">TypeScript</span>
                          <span className="badge">React.js</span>
                          <span className="badge">Vercel</span>
                        </div>
                        <div className="project-links">
                          <a href="https://bharat-yatra-puce.vercel.app" target="_blank" rel="noopener noreferrer" className="project-link" id="project-link-bharat">
                            🔗 Live Demo
                          </a>
                          <a href="https://github.com/divakarpandey07/BharatYatra" target="_blank" rel="noopener noreferrer" className="project-link" id="project-git-bharat">
                            💻 GitHub
                          </a>
                        </div>
                      </div>

                      {/* Project 3: NightShield */}
                      <div className="project-card" style={{ marginTop: '24px' }}>
                        <h3>NightShield <span className="timeline-date" style={{ fontSize: '0.65rem', marginLeft: '10px' }}>(Feb - May 2026)</span></h3>
                        <p style={{ marginTop: '8px' }}>Developed a secure real-time messaging mobile application using Java and Android Studio, integrated with end-to-end AES-based encryption and custom encoding-decoding mechanisms to protect user communications.</p>
                        <div className="project-image-container">
                          <img src="/nightshield_ss.png" alt="NightShield application screenshot" className="project-image" />
                        </div>
                        <div className="badge-container" style={{ marginTop: '12px' }}>
                          <span className="badge">Java</span>
                          <span className="badge">Android Studio</span>
                          <span className="badge">Firebase</span>
                          <span className="badge">AES Encryption</span>
                        </div>
                      </div>

                      {/* Project 4: IoT Digital Classroom */}
                      <div className="project-card" style={{ marginTop: '24px', borderBottom: 'none', paddingBottom: 0 }}>
                        <h3>IoT Digital Classroom <span className="timeline-date" style={{ fontSize: '0.65rem', marginLeft: '10px' }}>(Jan - Apr 2026)</span></h3>
                        <p style={{ marginTop: '8px' }}>Designed and built an automated smart classroom system utilizing NodeMCU ESP8266 and Firebase Realtime Database. Integrated DHT11 sensors for climate telemetry, ultrasonic sensors for automated seating occupancy, and secure RFID authentication for door access control.</p>
                        <div className="project-image-container">
                          <img src="/iot_classroom_ss.png" alt="IoT Digital Classroom simulation screenshot" className="project-image" />
                        </div>
                        <div className="badge-container" style={{ marginTop: '12px' }}>
                          <span className="badge">NodeMCU ESP8266</span>
                          <span className="badge">Firebase</span>
                          <span className="badge">C++ (Arduino)</span>
                          <span className="badge">IoT Sensors</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="archive-view-more-btn"
                    style={{ marginTop: '28px' }}
                    onClick={() => {
                      setView('projects-archive');
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    View Full Project Archive (8 Projects) →
                  </button>
                </div>
              </section>

              {/* Section 4: Certifications & More Work */}
              <section 
                id="certifications" 
                ref={sectionRefs.certifications}
                className={`scroll-section align-right ${activeSection === 'certifications' ? 'visible' : ''}`}
              >
                <div className="glass-card">
                  <span className="accent-text line-wrapper">
                    <span className="reveal-line stagger-1">RECOGNITIONS &amp; DEVELOPMENT</span>
                  </span>
                  <h2 className="line-wrapper">
                    <span className="reveal-line stagger-2">Certifications &amp; More</span>
                  </h2>
                  
                  <div className="divider"></div>
                  
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-date">May 2026</div>
                      <div className="timeline-title">Modern Technology &amp; Industry-Relevant Careers Workshop</div>
                      <div className="timeline-subtitle">Skillspardha Participant</div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Feb - May 2026</div>
                      <div className="timeline-title">Java Programming Certification</div>
                      <div className="timeline-subtitle">NEO COLAB (NIIT Venture)</div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Nov 2025</div>
                      <div className="timeline-title">InnoStart 2025 Innovation Event</div>
                      <div className="timeline-subtitle">LPU School of Computer Applications</div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Oct 2025</div>
                      <div className="timeline-title">MSME InnovXperience Exhibition</div>
                      <div className="timeline-subtitle">Participant — LPU Startup &amp; Enterprise Cell</div>
                    </div>
                  </div>

                  <button 
                    className="archive-view-more-btn"
                    style={{ marginTop: '24px' }}
                    onClick={() => {
                      setView('certifications-archive');
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    View All 7 Certifications →
                  </button>
                </div>
              </section>

              {/* Section 5: Contact */}
              <section 
                id="contact" 
                ref={sectionRefs.contact}
                className={`scroll-section align-center ${activeSection === 'contact' ? 'visible' : ''}`}
              >
                <div className="glass-card">
                  <span className="accent-text line-wrapper">
                    <span className="reveal-line stagger-1">SAY HELLO</span>
                  </span>
                  <h2 className="line-wrapper">
                    <span className="reveal-line stagger-2">Get In Touch</span>
                  </h2>
                  
                  <div className="divider" style={{ margin: '32px auto' }}></div>
                  
                  <p className="line-wrapper">
                    <span className="reveal-line stagger-3">Have an interesting project, job opportunity, or just want to chat about code?</span>
                  </p>
                  <p className="line-wrapper">
                    <span className="reveal-line stagger-4">My channels are always open. Feel free to contact me.</span>
                  </p>
                  
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-icon">✉</div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', textAlign: 'left', fontFamily: 'var(--font-accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>Email</p>
                        <a href="mailto:pandeydivakar07@gmail.com" className="contact-link">pandeydivakar07@gmail.com</a>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">📞</div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', textAlign: 'left', fontFamily: 'var(--font-accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>Phone</p>
                        <a href="tel:+916394163494" className="contact-link">+91 6394163494</a>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">🔗</div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', textAlign: 'left', fontFamily: 'var(--font-accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>LinkedIn</p>
                        <a href="https://www.linkedin.com/in/divakar6394163494/" target="_blank" rel="noopener noreferrer" className="contact-link">
                          linkedin.com/in/divakar6394163494
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '24px' }}>
                    <p style={{ fontSize: '0.75rem', margin: 0, fontFamily: 'var(--font-accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      © {new Date().getFullYear()} Divakar. All rights reserved.
                    </p>
                  </div>
                </div>
              </section>
            </main>
          </>
        ) : (
          <main className="overlays" style={{ padding: '0 24px' }}>
            <ArchivePage view={view} setView={setView} />
          </main>
        )}
      </div>
    </>
  );
}

function ArchivePage({ view, setView }) {
  // Full list of 8 Projects
  const projects = [
    {
      title: "digital-pateri",
      date: "Apr - Jul 2026",
      desc: "Smart Village Governance Portal for citizen services, grievance tickets, document vaults, and AI-assisted support in Pateri Gram Panchayat.",
      img: "/digital_pateri_ss.png",
      tech: ["React.js", "Node.js", "MongoDB", "Gemini AI"],
      demo: "https://digital-pateri.vercel.app",
      git: "https://github.com/divakarpandey07/digital-pateri"
    },
    {
      title: "BharatYatra",
      date: "2026",
      desc: "A premium web application designed for interactive travel planning and destination discovery across India with rich visual media.",
      img: "/bharat_yatra_ss.png",
      tech: ["TypeScript", "React.js", "Vercel"],
      demo: "https://bharat-yatra-puce.vercel.app",
      git: "https://github.com/divakarpandey07/BharatYatra"
    },
    {
      title: "NightShield",
      date: "Feb - May 2026",
      desc: "Developed a secure real-time messaging mobile application using Java and Android Studio, integrated with end-to-end AES-based encryption and custom encoding-decoding mechanisms to protect user communications.",
      img: "/nightshield_ss.png",
      tech: ["Java", "Android Studio", "Firebase", "AES Encryption"]
    },
    {
      title: "IoT Digital Classroom",
      date: "Jan - May 2026",
      desc: "Designed an ESP32-based offline digital quiz system featuring TFT LCD panels, push buttons, auto-scoring, and instant feedback for interactive rural school learning.",
      img: "/iot_classroom_ss.png",
      tech: ["ESP32", "Arduino IDE", "Embedded C", "Hardware"]
    },
    {
      title: "Saanidhya",
      date: "Oct - Dec 2025",
      desc: "A student PG and hostel listing finder application designed for seamless search, filter, and campus housing navigation.",
      img: "/saanidhya_ss.png",
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      demo: "https://sandybrown-emu-118805.hostingersite.com/",
      git: "https://github.com/divakarpandey07/Saanidhya"
    },
    {
      title: "Carbon-Tracker",
      date: "2026",
      desc: "An ecological tracking dashboard that calculates carbon footprints and visualizes environment impact stats with clean analytics.",
      img: "/carbon_tracker_ss.png",
      tech: ["React.js", "JavaScript", "TailwindCSS"],
      demo: "https://carbon-tracker-olive.vercel.app",
      git: "https://github.com/divakarpandey07/Carbon-Tracker"
    },
    {
      title: "CyberGuard",
      date: "Jan - Jun 2026",
      desc: "A Machine Learning-based Network Intrusion Detection System classifying anomalies in traffic using the CICIDS2017 dataset.",
      img: "/cyberguard_ss.png",
      tech: ["Python", "Scikit-learn", "Pandas", "ML"],
      git: "https://github.com/divakarpandey07/CyberGuard"
    },
    {
      title: "PeriodicTable",
      date: "2026",
      desc: "An educational, interactive chemistry periodic table visualization with clean layout and detailed element properties.",
      img: "/periodic_table_ss.png",
      tech: ["HTML", "CSS", "JavaScript"],
      git: "https://github.com/divakarpandey07/PeriodicTable"
    }
  ];

  // Full list of 5 Education stages
  const education = [
    {
      date: "2025 - Present",
      title: "Lovely Professional University",
      subtitle: "Master of Computer Applications (MCA) — CGPA: 7.36",
      desc: "Deepening knowledge in advanced software architecture, systems engineering, machine learning, and cloud infrastructure."
    },
    {
      date: "2023 - 2025",
      title: "National Institute of Electronics & Information Technology",
      subtitle: "O Level Certificate (Varanasi, UP)",
      desc: "Gained core computing foundation in database management, programming logic, and systems operation."
    },
    {
      date: "2022 - 2025",
      title: "Veer Bahadur Singh Purvanchal University",
      subtitle: "Bachelor of Computer Applications (BCA) — 70%",
      desc: "Completed basic computational learning with focus on object-oriented programming, data structures, and web technologies."
    },
    {
      date: "2021 - 2022",
      title: "Mahatma Gandhi Kashi Vidyapith",
      subtitle: "Post Graduate Diploma in Computer Applications — 56%",
      desc: "Practical database systems training, data management basics, and office applications integration."
    },
    {
      date: "2019 - 2021",
      title: "Mahatma Gandhi Kashi Vidyapith",
      subtitle: "Bachelor of Science (B.Sc.) — 60%",
      desc: "Foundational mathematics and physics coursework, building analytical and structured problem-solving skills."
    }
  ];

  // Full list of 7 Certifications & Events
  const certifications = [
    {
      date: "May 2026",
      title: "Modern Technology & Industry-Relevant Careers Workshop",
      subtitle: "Skillspardha Participant",
      desc: "Interactive training session focusing on high-end DevOps pipelines, cloud platforms, and modern development standards."
    },
    {
      date: "Feb - May 2026",
      title: "Java Programming Certification",
      subtitle: "NEO COLAB (NIIT Venture)",
      desc: "Certified implementation details on Java memory management, multi-threading, socket connections, and data algorithms."
    },
    {
      date: "Nov 2025",
      title: "InnoStart 2025 Innovation Event",
      subtitle: "LPU School of Computer Applications",
      desc: "Participated and showcased innovative full-stack application concepts to panel judges."
    },
    {
      date: "Oct 2025",
      title: "MSME InnovXperience Program",
      subtitle: "Successfully completed innovation initiatives",
      desc: "Earned honors for collaborative team prototype validation under central government innovation schemes."
    },
    {
      date: "Sep 2025",
      title: "AI Agents & The Future of Jobs - Founder's Talk",
      subtitle: "Capabl / Infoity / DSO Participant",
      desc: "Interactive panel seminar exploring automated workflow design, LLM agents, and industry transition methodologies."
    },
    {
      date: "Sep 2025",
      title: "Tech Blitz 2025 - 24Hr Hackathon",
      subtitle: "Coding Ninjas, Lovely Professional University",
      desc: "Worked overnight under high pressure to design and deliver a functional full-stack prototype."
    },
    {
      date: "Aug 2025",
      title: "Honored for Technical Contributions",
      subtitle: "Acknowledged for organizational and technical activities",
      desc: "Received certification honor for active role in managing and driving tech initiatives."
    }
  ];

  // Determine page meta values
  let pageTitle = "";
  let pageSubtitle = "";

  if (view === 'projects-archive') {
    pageTitle = "Project Gallery";
    pageSubtitle = "Complete list of active works and platforms";
  } else if (view === 'education-archive') {
    pageTitle = "Academic History";
    pageSubtitle = "Full educational timeline and credentials";
  } else if (view === 'certifications-archive') {
    pageTitle = "Certifications & Events";
    pageSubtitle = "Recognitions, courses and hackathon history";
  }

  return (
    <section className="scroll-section align-center visible" style={{ minHeight: 'auto', padding: '120px 0 60px' }}>
      <div className="glass-card" style={{ width: '100%' }}>
        <div className="archive-header">
          <div>
            <span className="accent-text" style={{ letterSpacing: '3px', fontSize: '0.7rem' }}>DIVAKAR</span>
            <h2 style={{ fontSize: '2.0rem', marginTop: '6px' }} className="shimmer-title">{pageTitle}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>{pageSubtitle}</p>
          </div>
          <button className="archive-back-btn" onClick={() => setView('main')}>
            ← Back to Exhibition
          </button>
        </div>

        {view === 'projects-archive' && (
          <div className="archive-grid">
            {projects.map((proj, idx) => (
              <div 
                key={idx} 
                className={`project-card archive-stagger-${Math.min(idx + 1, 10)}`}
                style={{ borderBottom: 'none', background: 'rgba(255,255,255,0.015)', padding: '24px', border: '1px solid rgba(255,255,255,0.04)' }}
              >
                <h3>{proj.title} <span className="timeline-date" style={{ fontSize: '0.65rem', marginLeft: '10px' }}>({proj.date})</span></h3>
                <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>{proj.desc}</p>
                <div className="project-image-container" style={{ height: '160px' }}>
                  <img src={proj.img} alt={proj.title} className="project-image" />
                </div>
                <div className="badge-container" style={{ marginTop: '12px', opacity: 1, transform: 'none' }}>
                  {proj.tech.map((t, i) => (
                    <span key={i} className="badge" style={{ fontSize: '0.6rem', padding: '4px 10px' }}>{t}</span>
                  ))}
                </div>
                {(proj.demo || proj.git) && (
                  <div className="project-links" style={{ marginTop: '16px' }}>
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="project-link" style={{ fontSize: '0.65rem' }}>
                        🔗 Live Demo
                      </a>
                    )}
                    {proj.git && (
                      <a href={proj.git} target="_blank" rel="noopener noreferrer" className="project-link" style={{ fontSize: '0.65rem' }}>
                        💻 GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {view === 'education-archive' && (
          <div className="archive-list">
            <div className="timeline" style={{ opacity: 1, transform: 'none' }}>
              {education.map((edu, idx) => (
                <div 
                  key={idx} 
                  className={`timeline-item archive-stagger-${Math.min(idx + 1, 10)}`} 
                  style={{ borderLeftColor: 'var(--accent-gold)' }}
                >
                  <div className="timeline-date">{edu.date}</div>
                  <div className="timeline-title">{edu.title}</div>
                  <div className="timeline-subtitle">{edu.subtitle}</div>
                  <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>{edu.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'certifications-archive' && (
          <div className="archive-list">
            <div className="timeline" style={{ opacity: 1, transform: 'none' }}>
              {certifications.map((cert, idx) => (
                <div 
                  key={idx} 
                  className={`timeline-item archive-stagger-${Math.min(idx + 1, 10)}`} 
                  style={{ borderLeftColor: 'var(--accent-gold)' }}
                >
                  <div className="timeline-date">{cert.date}</div>
                  <div className="timeline-title">{cert.title}</div>
                  <div className="timeline-subtitle">{cert.subtitle}</div>
                  <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
