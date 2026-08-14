import React, { useEffect, useState, useRef } from 'react';
import ThreeScene from './ThreeScene';
import Lenis from 'lenis';
import Toast from './components/Toast';
import CommandPalette from './components/CommandPalette';
import ProjectModal from './components/ProjectModal';
import MobileNav from './components/MobileNav';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'education-skills', label: 'Education & Skills' },
  { id: 'featured-projects', label: 'Featured Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];

const ALL_PROJECTS = [
  {
    id: 'digital-pateri',
    title: 'digital-pateri',
    date: 'Apr - Jul 2026',
    category: 'fullstack',
    categoryLabel: 'Full-Stack & AI',
    desc: 'Smart Village Governance Portal for citizen services, grievance tickets, document vaults, and AI-assisted support in Pateri Gram Panchayat.',
    longDesc: 'A comprehensive digital governance initiative engineered for Pateri Gram Panchayat. It digitizes administrative public services, streamlines citizen grievance lodging, provides secure digital document vaults, and integrates Google Gemini AI for instant multilingual citizen guidance and form assistance.',
    highlights: [
      'Engineered citizen grievance redressal pipeline with real-time status tracking and automated officer routing.',
      'Integrated Google Gemini AI assistant for voice/text civic inquiries and automated government scheme recommendations.',
      'Designed tamper-proof digital certificates and citizen document vault with role-based access control.',
      'Responsive full-stack architecture built with React.js, Express/Node.js, and MongoDB.'
    ],
    img: '/digital_pateri_ss.png',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Gemini AI', 'REST API'],
    demo: 'https://digital-pateri.vercel.app',
    git: 'https://github.com/divakarpandey07/digital-pateri'
  },
  {
    id: 'bharat-yatra',
    title: 'BharatYatra',
    date: '2026',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    desc: 'A premium web application designed for interactive travel planning and destination discovery across India with rich visual media.',
    longDesc: 'BharatYatra is an immersive travel exploration and itinerary planning platform. It enables tourists to explore Indian heritage, discover hidden cultural destinations, calculate regional travel budgets, and create personalized travel itineraries.',
    highlights: [
      'Interactive regional destination guides with curated media and high-resolution visual storytelling.',
      'Real-time itinerary builder with dynamic budget estimates and transit mapping.',
      'Clean modern UI crafted with TypeScript and React.js, optimized for zero-latency page transitions.'
    ],
    img: '/bharat_yatra_ss.png',
    tech: ['TypeScript', 'React.js', 'Vercel', 'TailwindCSS', 'Framer Motion'],
    demo: 'https://bharat-yatra-puce.vercel.app',
    git: 'https://github.com/divakarpandey07/BharatYatra'
  },
  {
    id: 'nightshield',
    title: 'NightShield',
    date: 'Feb - May 2026',
    category: 'mobile',
    categoryLabel: 'Mobile & Security',
    desc: 'Developed a secure real-time messaging mobile application using Java and Android Studio, integrated with end-to-end AES encryption.',
    longDesc: 'NightShield is an enterprise-grade secure instant messaging Android application designed for encrypted communications. It features client-side cryptographic hashing, AES-256 cipher pipelines, and private channel key exchanges.',
    highlights: [
      'Implemented end-to-end AES-256 encryption with custom byte encoding/decoding on mobile devices.',
      'Engineered real-time socket-like messaging using Firebase Realtime Database and Cloud Messaging.',
      'Built native Android UI in Java with Android Studio adhering to Material Design 3 guidelines.'
    ],
    img: '/nightshield_ss.png',
    tech: ['Java', 'Android Studio', 'Firebase', 'AES-256', 'Cryptography'],
    git: 'https://github.com/divakarpandey07/NightShield'
  },
  {
    id: 'iot-classroom',
    title: 'IoT Digital Classroom',
    date: 'Jan - Apr 2026',
    category: 'iot',
    categoryLabel: 'IoT & Systems',
    desc: 'Automated smart classroom system utilizing NodeMCU ESP8266 and ESP32 with RFID door access, climate telemetry, and automated occupancy sensors.',
    longDesc: 'Designed and deployed an integrated smart classroom environment to automate attendance, power management, and room environment control. Features secure RFID card student check-in, ultrasonic automated seating counters, and DHT11 climate telemetry.',
    highlights: [
      'Built hardware firmware in C++ (Arduino IDE) with NodeMCU ESP8266 and ESP32 microcontrollers.',
      'Integrated Firebase Realtime Database for instant synchronization of telemetry and attendance records.',
      'Automated classroom lighting and fan controls based on PIR motion and ultrasonic occupancy thresholds.'
    ],
    img: '/iot_classroom_ss.png',
    tech: ['ESP32', 'NodeMCU ESP8266', 'C++', 'Firebase', 'IoT Sensors', 'RFID'],
    git: 'https://github.com/divakarpandey07/IoT-Digital-Classroom'
  },
  {
    id: 'carbon-tracker',
    title: 'Carbon-Tracker',
    date: '2026',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    desc: 'An ecological tracking dashboard that calculates carbon footprints and visualizes environment impact stats with clean analytics.',
    longDesc: 'Carbon-Tracker helps individuals and organizations calculate their carbon emissions across travel, electricity, diet, and lifestyle, presenting actionable reduction recommendations and interactive data charts.',
    highlights: [
      'Dynamic carbon footprint estimation algorithms based on verified climate emission factors.',
      'Interactive data charts and visual breakdowns for personal sustainability goals.',
      'Ultra-fast responsive web interface built with React.js.'
    ],
    img: '/carbon_tracker_ss.png',
    tech: ['React.js', 'JavaScript', 'TailwindCSS', 'Chart.js'],
    demo: 'https://carbon-tracker-olive.vercel.app',
    git: 'https://github.com/divakarpandey07/Carbon-Tracker'
  },
  {
    id: 'cyberguard',
    title: 'CyberGuard',
    date: 'Jan - Jun 2026',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    desc: 'Machine Learning-based Network Intrusion Detection System classifying anomalies in traffic using the CICIDS2017 dataset.',
    longDesc: 'CyberGuard is a cyber defense system utilizing machine learning classifiers (Random Forests, XGBoost, Support Vector Machines) to identify, flag, and classify network attack vectors (DDoS, PortScans, BruteForce) in real-time.',
    highlights: [
      'Processed and engineered feature pipelines on high-dimensional network flow data (CICIDS2017).',
      'Achieved over 98.4% classification accuracy across multi-class intrusion categories.',
      'Implemented automated anomaly alert reporting and visualization dashboards in Python.'
    ],
    img: '/cyberguard_ss.png',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Machine Learning', 'Cybersecurity'],
    git: 'https://github.com/divakarpandey07/CyberGuard'
  },
  {
    id: 'saanidhya',
    title: 'Saanidhya',
    date: 'Oct - Dec 2025',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    desc: 'Student PG and hostel listing finder application designed for seamless search, filter, and campus housing navigation.',
    longDesc: 'A campus housing marketplace built to help students discover verified PGs, compare amenities, check pricing, and connect directly with property managers without broker intermediaries.',
    highlights: [
      'Engineered multi-parameter search (budget, distance from college, food inclusion, room sharing).',
      'Built secure relational database architecture using MySQL and backend logic in PHP.',
      'Deployed on cloud hosting with instant photo galleries and location directions.'
    ],
    img: '/saanidhya_ss.png',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3'],
    demo: 'https://sandybrown-emu-118805.hostingersite.com/',
    git: 'https://github.com/divakarpandey07/Saanidhya'
  },
  {
    id: 'periodictable',
    title: 'PeriodicTable',
    date: '2026',
    category: 'fullstack',
    categoryLabel: 'Interactive Web',
    desc: 'An educational, interactive chemistry periodic table visualization with clean layout and detailed element properties.',
    longDesc: 'An interactive scientific web tool visualizing all 118 chemical elements with electronic configuration, oxidation states, atomic radii, and orbital models in real-time.',
    highlights: [
      'Interactive element grid with instant property modals and group/period filter highlighting.',
      'Lightweight vanilla JavaScript architecture with zero heavy dependencies.'
    ],
    img: '/periodic_table_ss.png',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Education Tech'],
    git: 'https://github.com/divakarpandey07/PeriodicTable'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('main');

  // New interactive states
  const [cmdOpen, setCmdOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [projectCategory, setProjectCategory] = useState('all');
  const [toast, setToast] = useState({ visible: false, message: '', icon: '✨' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSending, setFormSending] = useState(false);

  const sectionRefs = {
    hero: useRef(null),
    'education-skills': useRef(null),
    'featured-projects': useRef(null),
    certifications: useRef(null),
    contact: useRef(null)
  };

  const showToast = (message, icon = '✨') => {
    setToast({ visible: true, message, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Divakar_Cv.pdf';
    link.download = 'Divakar_Pandey_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Resume / CV downloaded! 📄', '📥');
  };

  // Loader simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 18) + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
      setLoadingProgress(current);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4
    });

    window.lenis = lenis;

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScrollUpdate = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(Math.max(lenis.scroll / totalHeight, 0), 1);
      setScrollProgress(progress);
      document.documentElement.style.setProperty('--scroll', String(progress));

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
    setTimeout(handleScrollUpdate, 100);

    const handleResize = () => handleScrollUpdate();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mouse Move tracking for custom cursor and 3D parallax
  useEffect(() => {
    let rafPending = false;
    let latestEvent = null;

    const handleMouseMove = (e) => {
      latestEvent = e;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        if (latestEvent) {
          setCursorPos({ x: latestEvent.clientX, y: latestEvent.clientY });
          window.mx = (latestEvent.clientX / window.innerWidth) * 2 - 1;
          window.my = -(latestEvent.clientY / window.innerHeight) * 2 + 1;
        }
        rafPending = false;
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('.glass-card') ||
        target.closest('.project-card') ||
        target.closest('.dot-wrapper') ||
        target.closest('.hud-nav-item') ||
        target.closest('.hud-logo') ||
        target.closest('.btn-primary') ||
        target.closest('.btn-outline');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Cursor particle trail on desktop
  useEffect(() => {
    if (window.innerWidth < 768) return;
    let lastSparkle = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastSparkle < 50) return;
      lastSparkle = now;

      const particle = document.createElement('div');
      particle.className = 'sparkle-particle';
      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 25 + 10;
      particle.style.setProperty('--dx', `${Math.cos(angle) * speed}px`);
      particle.style.setProperty('--dy', `${Math.sin(angle) * speed}px`);

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 700);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click ripple burst
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const handleClick = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      for (let i = 0; i < 4; i++) {
        const p = document.createElement('div');
        p.className = 'click-burst-particle';
        p.style.left = `${e.clientX}px`;
        p.style.top = `${e.clientY}px`;
        const angle = (i / 4) * Math.PI * 2;
        const velocity = 25 + Math.random() * 15;
        p.style.setProperty('--dx', `${Math.cos(angle) * velocity}px`);
        p.style.setProperty('--dy', `${Math.sin(angle) * velocity}px`);
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 500);
      }
      setTimeout(() => ripple.remove(), 500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // 3D Card Tilt on desktop
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const cards = document.querySelectorAll('.glass-card, .project-card');
    let rafId = null;

    const handleMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const angleX = -(y - rect.height / 2) / 36;
        const angleY = (x - rect.width / 2) / 36;
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.008, 1.008, 1.008)`;
        card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
        card.style.setProperty('--glare-opacity', '1');
        rafId = null;
      });
    };

    const handleLeave = (e) => {
      cancelAnimationFrame(rafId);
      rafId = null;
      const card = e.currentTarget;
      card.style.transform = '';
      card.style.setProperty('--glare-opacity', '0');
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMove, { passive: true });
      card.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [view, projectCategory]);

  const scrollToSection = (id) => {
    if (view !== 'main') {
      setView('main');
      setTimeout(() => {
        const targetRef = sectionRefs[id];
        if (targetRef && targetRef.current) {
          window.lenis?.scrollTo(targetRef.current, { duration: 1.2 });
        }
      }, 100);
      return;
    }

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

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (projectCategory === 'all') return true;
    return p.category === projectCategory;
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSending(true);
    setTimeout(() => {
      setFormSending(false);
      setContactForm({ name: '', email: '', message: '' });
      showToast('Thank you! Your message has been prepared.', '🚀');
      window.location.href = `mailto:pandeydivakar07@gmail.com?subject=Contact from ${encodeURIComponent(contactForm.name)}&body=${encodeURIComponent(contactForm.message)}%0A%0AFrom: ${encodeURIComponent(contactForm.email)}`;
    }, 600);
  };

  return (
    <>
      {/* Premium Loader */}
      <div className={`loader-screen ${!loading ? 'hidden' : ''}`}>
        <div className="loader-logo">DIVAKAR<span>PANDEY</span></div>
        <div className="loader-bar-bg">
          <div className="loader-bar" style={{ width: `${loadingProgress}%` }}></div>
        </div>
        <div className="loader-number">{loadingProgress}%</div>
        <p className="loader-tip">LOADING 3D COMPUTING EXHIBITION...</p>
      </div>

      {/* Floating Custom Cursor */}
      {!loading && (
        <div
          className={`cursor-follower ${isHovering ? 'hovering' : ''}`}
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
        />
      )}

      {/* Toast Notification */}
      <Toast visible={toast.visible} message={toast.message} icon={toast.icon} />

      {/* Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={scrollToSection}
        onShowToast={showToast}
        onOpenArchive={(archiveView) => {
          setView(archiveView);
          window.scrollTo({ top: 0 });
        }}
      />

      {/* Project Deep Dive Modal */}
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />

      {/* Mobile Floating Island Dock */}
      <MobileNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenCommandPalette={() => setCmdOpen(true)}
      />

      <div className="app-shell">
        {/* Feathered Header Blur Bar */}
        <div className="hud-bar" aria-hidden="true" />

        {/* 3D Canvas Background */}
        <div className="canvas-bg" aria-hidden="true">
          <ThreeScene modelPath="/model.glb" scrollProgress={scrollProgress} />
        </div>

        {view === 'main' ? (
          <>
            {/* Top Navigation HUD */}
            <header className="hud">
              <div className="hud-logo" onClick={() => scrollToSection('hero')}>
                DIVAKAR<span>.DEV</span>
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

              <div className="hud-actions">
                <button
                  className="hud-cmd-btn"
                  onClick={() => setCmdOpen(true)}
                  title="Search & Actions (Ctrl+K / Cmd+K)"
                  aria-label="Open command palette"
                >
                  <span>⌘K</span>
                </button>

                <button
                  className="hud-resume-btn"
                  onClick={handleDownloadCV}
                  aria-label="Download Resume"
                >
                  <span>CV 📄</span>
                </button>
              </div>
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

            {/* Bottom Progress Bar */}
            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>

            {/* Scrollable Main Content */}
            <main className="overlays">
              {/* SECTION 1: HERO */}
              <section
                id="hero"
                ref={sectionRefs.hero}
                className={`scroll-section align-left ${activeSection === 'hero' ? 'visible' : ''}`}
              >
                <div className="glass-card hero-card">
                  {/* Live Status Badge */}
                  <div className="live-status-pill">
                    <span className="live-status-dot"></span>
                    <span className="live-status-text">AVAILABLE FOR ROLES &amp; INNOVATIONS</span>
                  </div>

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

                  <p className="line-wrapper hero-bio">
                    <span className="reveal-line stagger-4">
                      I am <strong>Divakar Pandey</strong>, Full-Stack Software Engineer &amp; MCA Candidate at Lovely Professional University.
                    </span>
                  </p>
                  <p className="line-wrapper hero-desc">
                    <span className="reveal-line stagger-5">
                      Specializing in high-performance web systems, AI-assisted governance architectures, and secure mobile &amp; IoT solutions.
                    </span>
                  </p>

                  {/* Primary CTA Buttons */}
                  <div className="hero-cta-group">
                    <button
                      className="btn-primary"
                      onClick={handleDownloadCV}
                      id="hero-download-cv-btn"
                    >
                      <span>Download Resume (PDF)</span>
                      <span className="btn-icon">📄</span>
                    </button>

                    <button
                      className="btn-outline"
                      onClick={() => scrollToSection('featured-projects')}
                      id="hero-view-work-btn"
                    >
                      <span>Explore Projects</span>
                      <span className="btn-icon">↓</span>
                    </button>
                  </div>

                  {/* Quick Social Links Bar */}
                  <div className="hero-social-links">
                    <a
                      href="https://github.com/divakarpandey07"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                      title="GitHub"
                    >
                      🐙 GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/divakar6394163494/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                      title="LinkedIn"
                    >
                      🔗 LinkedIn
                    </a>
                    <a
                      href="mailto:pandeydivakar07@gmail.com"
                      className="social-icon-link"
                      title="Email"
                    >
                      ✉️ Email
                    </a>
                    <button
                      className="social-icon-link cmd-trigger-text"
                      onClick={() => setCmdOpen(true)}
                    >
                      ⌨️ ⌘K Menu
                    </button>
                  </div>

                  <div className="badge-container">
                    <span className="badge">Full-Stack Architecture</span>
                    <span className="badge">AI / Gemini API</span>
                    <span className="badge">IoT Embedded Systems</span>
                    <span className="badge">Android Security</span>
                  </div>

                  <div className="hero-scroll-prompt">
                    <span className="scroll-arrow">↓</span>
                    <span>SCROLL DOWN TO EXPLORE</span>
                  </div>
                </div>
              </section>

              {/* SECTION 2: EDUCATION & SKILLS */}
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
                      <p style={{ marginTop: '6px', fontSize: '0.82rem' }}>Advanced Software Architecture, Cloud Infrastructure, Machine Learning, and Systems Engineering.</p>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">2023 - 2025</div>
                      <div className="timeline-title">NIELIT (Varanasi, UP)</div>
                      <div className="timeline-subtitle">O Level Computing Certificate</div>
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
                    View Full Academic History (5 Degrees) →
                  </button>

                  <div className="skills-matrix-header" style={{ marginTop: '36px' }}>
                    <span className="accent-text" style={{ fontSize: '0.65rem' }}>CORE TECHNICAL ARSENAL</span>
                  </div>

                  <div className="badge-container" style={{ marginTop: '16px', gap: '12px' }}>
                    <span className="bounce-badge"><span className="badge-emoji">⚛️</span> React.js</span>
                    <span className="bounce-badge"><span className="badge-emoji">🟢</span> Node.js</span>
                    <span className="bounce-badge"><span className="badge-emoji">⚙️</span> C++</span>
                    <span className="bounce-badge"><span className="badge-emoji">☕</span> Java</span>
                    <span className="bounce-badge"><span className="badge-emoji">🐍</span> Python</span>
                    <span className="bounce-badge"><span className="badge-emoji">🤖</span> Gemini AI</span>
                    <span className="bounce-badge"><span className="badge-emoji">📱</span> Android Studio</span>
                    <span className="bounce-badge"><span className="badge-emoji">🔌</span> IoT &amp; ESP32</span>
                    <span className="bounce-badge"><span className="badge-emoji">💾</span> SQL / MongoDB</span>
                    <span className="bounce-badge"><span className="badge-emoji">🌿</span> Git &amp; GitHub</span>
                    <span className="bounce-badge"><span className="badge-emoji">🐧</span> Linux</span>
                    <span className="bounce-badge"><span className="badge-emoji">🧠</span> DSA &amp; OOP</span>
                  </div>
                </div>
              </section>

              {/* SECTION 3: FEATURED PROJECTS */}
              <section
                id="featured-projects"
                ref={sectionRefs['featured-projects']}
                className={`scroll-section align-left ${activeSection === 'featured-projects' ? 'visible' : ''}`}
              >
                <div className="glass-card" style={{ maxWidth: '720px' }}>
                  <span className="accent-text line-wrapper">
                    <span className="reveal-line stagger-1">SELECTED WORK</span>
                  </span>
                  <h2 className="line-wrapper">
                    <span className="reveal-line stagger-2">Featured Projects</span>
                  </h2>

                  <div className="divider"></div>

                  {/* Category Filter Pills */}
                  <div className="project-filter-bar">
                    {[
                      { key: 'all', label: 'All (8)' },
                      { key: 'fullstack', label: 'Full-Stack' },
                      { key: 'aiml', label: 'AI & ML' },
                      { key: 'mobile', label: 'Android' },
                      { key: 'iot', label: 'IoT' }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        className={`filter-pill ${projectCategory === tab.key ? 'active' : ''}`}
                        onClick={() => setProjectCategory(tab.key)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Fluid Project Cards Deck */}
                  <div className="project-grid-responsive">
                    {filteredProjects.slice(0, 4).map((proj) => (
                      <div key={proj.id} className="project-card interactive-project-card">
                        <div className="project-card-header">
                          <div>
                            <h3>{proj.title}</h3>
                            <span className="timeline-date">{proj.date}</span>
                          </div>
                          <span className="project-category-tag">{proj.categoryLabel}</span>
                        </div>

                        <p className="project-card-desc">{proj.desc}</p>

                        <div
                          className="project-image-container"
                          onClick={() => setModalProject(proj)}
                          title="Click to view deep dive case study"
                        >
                          <img src={proj.img} alt={`${proj.title} screenshot`} className="project-image" loading="lazy" />
                          <div className="project-image-overlay">
                            <span>🔍 Deep Dive Case Study</span>
                          </div>
                        </div>

                        <div className="badge-container" style={{ marginTop: '10px', opacity: 1, transform: 'none' }}>
                          {proj.tech.map((t, idx) => (
                            <span key={idx} className="badge">{t}</span>
                          ))}
                        </div>

                        <div className="project-links">
                          <button
                            className="project-link-btn case-study-btn"
                            onClick={() => setModalProject(proj)}
                          >
                            🔍 Case Study
                          </button>

                          {proj.demo && (
                            <a
                              href={proj.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                              id={`project-demo-${proj.id}`}
                            >
                              🔗 Live Demo
                            </a>
                          )}

                          {proj.git && (
                            <a
                              href={proj.git}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                              id={`project-git-${proj.id}`}
                            >
                              💻 GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="archive-view-more-btn"
                    style={{ marginTop: '32px' }}
                    onClick={() => {
                      setView('projects-archive');
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    View All 8 Projects in Gallery →
                  </button>
                </div>
              </section>

              {/* SECTION 4: CERTIFICATIONS */}
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
                      <div className="timeline-title">Modern Technology &amp; Industry Careers Workshop</div>
                      <div className="timeline-subtitle">Skillspardha Participant — High-end DevOps &amp; Cloud Standards</div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Feb - May 2026</div>
                      <div className="timeline-title">Java Programming Certification</div>
                      <div className="timeline-subtitle">NEO COLAB (NIIT Venture) — Certified Multi-threading &amp; Memory Architectures</div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Nov 2025</div>
                      <div className="timeline-title">InnoStart 2025 Innovation Event</div>
                      <div className="timeline-subtitle">LPU School of Computer Applications — Prototype Presenter</div>
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
                    View All 7 Certifications &amp; Hackathons →
                  </button>
                </div>
              </section>

              {/* SECTION 5: CONTACT & RESUME */}
              <section
                id="contact"
                ref={sectionRefs.contact}
                className={`scroll-section align-center ${activeSection === 'contact' ? 'visible' : ''}`}
              >
                <div className="glass-card" style={{ maxWidth: '720px' }}>
                  <span className="accent-text line-wrapper">
                    <span className="reveal-line stagger-1">SAY HELLO // COLLABORATE</span>
                  </span>
                  <h2 className="line-wrapper">
                    <span className="reveal-line stagger-2">Get In Touch</span>
                  </h2>

                  <div className="divider" style={{ margin: '28px auto' }}></div>

                  <p className="line-wrapper" style={{ textAlign: 'center' }}>
                    <span className="reveal-line stagger-3">
                      Have an interesting project, full-time engineering opportunity, or research collaboration?
                    </span>
                  </p>

                  {/* Direct Resume Download Card */}
                  <div className="resume-download-box">
                    <div className="resume-box-left">
                      <span className="resume-icon">📄</span>
                      <div>
                        <div className="resume-box-title">Divakar_Pandey_Resume.pdf</div>
                        <div className="resume-box-sub">Official Master of Computer Applications Resume</div>
                      </div>
                    </div>
                    <div className="resume-box-actions">
                      <button
                        className="btn-primary-small"
                        onClick={handleDownloadCV}
                        id="contact-download-resume-btn"
                      >
                        📥 Download CV
                      </button>
                      <a
                        href="/Divakar_Cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-small"
                      >
                        👁️ Preview
                      </a>
                    </div>
                  </div>

                  {/* 1-Click Copy Contacts */}
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-icon">✉</div>
                      <div className="contact-info">
                        <p className="contact-label">Email</p>
                        <a href="mailto:pandeydivakar07@gmail.com" className="contact-link">
                          pandeydivakar07@gmail.com
                        </a>
                      </div>
                      <button
                        className="copy-btn"
                        onClick={() => {
                          navigator.clipboard.writeText('pandeydivakar07@gmail.com');
                          showToast('Email copied to clipboard! 📋', '✅');
                        }}
                        title="Copy Email"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">📞</div>
                      <div className="contact-info">
                        <p className="contact-label">Phone</p>
                        <a href="tel:+916394163494" className="contact-link">+91 6394163494</a>
                      </div>
                      <button
                        className="copy-btn"
                        onClick={() => {
                          navigator.clipboard.writeText('+916394163494');
                          showToast('Phone copied to clipboard! 📋', '✅');
                        }}
                        title="Copy Phone"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">🔗</div>
                      <div className="contact-info">
                        <p className="contact-label">LinkedIn</p>
                        <a
                          href="https://www.linkedin.com/in/divakar6394163494/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-link"
                        >
                          linkedin.com/in/divakar6394163494
                        </a>
                      </div>
                      <a
                        href="https://www.linkedin.com/in/divakar6394163494/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="copy-btn"
                      >
                        Open ↗
                      </a>
                    </div>
                  </div>

                  {/* Interactive Quick Message Form */}
                  <form className="contact-quick-form" onSubmit={handleContactSubmit}>
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        className="form-input"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        className="form-input"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </div>
                    <textarea
                      placeholder="Your Message or Project Opportunity..."
                      required
                      rows={3}
                      className="form-input form-textarea"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                    <button type="submit" className="btn-primary" disabled={formSending}>
                      <span>{formSending ? 'Preparing Dispatch...' : 'Send Message 🚀'}</span>
                    </button>
                  </form>

                  <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.72rem', margin: 0, fontFamily: 'var(--font-accent)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                      © {new Date().getFullYear()} Divakar Pandey. Crafted with React &amp; Three.js.
                    </p>
                  </div>
                </div>
              </section>
            </main>
          </>
        ) : (
          <main className="overlays" style={{ padding: '0 20px' }}>
            <ArchivePage
              view={view}
              setView={setView}
              onOpenModal={setModalProject}
              onDownloadCV={handleDownloadCV}
            />
          </main>
        )}
      </div>
    </>
  );
}

function ArchivePage({ view, setView, onOpenModal, onDownloadCV }) {
  const projects = ALL_PROJECTS;

  const education = [
    {
      date: '2025 - Present',
      title: 'Lovely Professional University',
      subtitle: 'Master of Computer Applications (MCA) — CGPA: 7.36',
      desc: 'Deepening knowledge in advanced software architecture, systems engineering, machine learning, and cloud infrastructure.'
    },
    {
      date: '2023 - 2025',
      title: 'National Institute of Electronics & Information Technology',
      subtitle: 'O Level Certificate (Varanasi, UP)',
      desc: 'Gained core computing foundation in database management, programming logic, and systems operation.'
    },
    {
      date: '2022 - 2025',
      title: 'Veer Bahadur Singh Purvanchal University',
      subtitle: 'Bachelor of Computer Applications (BCA) — 70%',
      desc: 'Completed foundational computational learning with focus on object-oriented programming, data structures, and web technologies.'
    },
    {
      date: '2021 - 2022',
      title: 'Mahatma Gandhi Kashi Vidyapith',
      subtitle: 'Post Graduate Diploma in Computer Applications — 56%',
      desc: 'Practical database systems training, data management basics, and office applications integration.'
    },
    {
      date: '2019 - 2021',
      title: 'Mahatma Gandhi Kashi Vidyapith',
      subtitle: 'Bachelor of Science (B.Sc.) — 60%',
      desc: 'Foundational mathematics and physics coursework, building analytical and structured problem-solving skills.'
    }
  ];

  const certifications = [
    {
      date: 'May 2026',
      title: 'Modern Technology & Industry-Relevant Careers Workshop',
      subtitle: 'Skillspardha Participant',
      desc: 'Interactive training session focusing on high-end DevOps pipelines, cloud platforms, and modern development standards.'
    },
    {
      date: 'Feb - May 2026',
      title: 'Java Programming Certification',
      subtitle: 'NEO COLAB (NIIT Venture)',
      desc: 'Certified implementation details on Java memory management, multi-threading, socket connections, and data algorithms.'
    },
    {
      date: 'Nov 2025',
      title: 'InnoStart 2025 Innovation Event',
      subtitle: 'LPU School of Computer Applications',
      desc: 'Participated and showcased innovative full-stack application concepts to panel judges.'
    },
    {
      date: 'Oct 2025',
      title: 'MSME InnovXperience Program',
      subtitle: 'Successfully completed innovation initiatives',
      desc: 'Earned honors for collaborative team prototype validation under central government innovation schemes.'
    },
    {
      date: 'Sep 2025',
      title: "AI Agents & The Future of Jobs - Founder's Talk",
      subtitle: 'Capabl / Infoity / DSO Participant',
      desc: 'Interactive panel seminar exploring automated workflow design, LLM agents, and industry transition methodologies.'
    },
    {
      date: 'Sep 2025',
      title: 'Tech Blitz 2025 - 24Hr Hackathon',
      subtitle: 'Coding Ninjas, Lovely Professional University',
      desc: 'Worked overnight under high pressure to design and deliver a functional full-stack prototype.'
    },
    {
      date: 'Aug 2025',
      title: 'Honored for Technical Contributions',
      subtitle: 'Acknowledged for organizational and technical activities',
      desc: 'Received certification honor for active role in managing and driving tech initiatives.'
    }
  ];

  let pageTitle = '';
  let pageSubtitle = '';

  if (view === 'projects-archive') {
    pageTitle = 'Project Gallery';
    pageSubtitle = 'Complete catalogue of engineering projects & platforms';
  } else if (view === 'education-archive') {
    pageTitle = 'Academic History';
    pageSubtitle = 'Full educational timeline and credentials';
  } else if (view === 'certifications-archive') {
    pageTitle = 'Certifications & Events';
    pageSubtitle = 'Recognitions, courses and hackathon history';
  }

  return (
    <section className="scroll-section align-center visible" style={{ minHeight: 'auto', padding: '100px 0 60px' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '1000px' }}>
        <div className="archive-header">
          <div>
            <span className="accent-text" style={{ letterSpacing: '3px', fontSize: '0.7rem' }}>DIVAKAR PANDEY</span>
            <h2 style={{ fontSize: '2.0rem', marginTop: '6px' }} className="shimmer-title">{pageTitle}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>{pageSubtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="archive-back-btn" onClick={onDownloadCV}>
              Download Resume 📄
            </button>
            <button className="archive-back-btn" onClick={() => setView('main')}>
              ← Back to Exhibition
            </button>
          </div>
        </div>

        {view === 'projects-archive' && (
          <div className="archive-grid">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className={`project-card archive-stagger-${Math.min(idx + 1, 10)}`}
                style={{
                  borderBottom: 'none',
                  background: 'rgba(255,255,255,0.015)',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3>{proj.title}</h3>
                  <span className="timeline-date" style={{ fontSize: '0.65rem' }}>{proj.date}</span>
                </div>
                <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>{proj.desc}</p>
                <div
                  className="project-image-container"
                  style={{ height: '160px', cursor: 'pointer' }}
                  onClick={() => onOpenModal(proj)}
                >
                  <img src={proj.img} alt={proj.title} className="project-image" loading="lazy" />
                  <div className="project-image-overlay">
                    <span>🔍 Case Study</span>
                  </div>
                </div>
                <div className="badge-container" style={{ marginTop: '12px', opacity: 1, transform: 'none' }}>
                  {proj.tech.map((t, i) => (
                    <span key={i} className="badge" style={{ fontSize: '0.6rem', padding: '4px 10px' }}>{t}</span>
                  ))}
                </div>
                <div className="project-links" style={{ marginTop: '16px' }}>
                  <button
                    className="project-link-btn case-study-btn"
                    style={{ fontSize: '0.65rem' }}
                    onClick={() => onOpenModal(proj)}
                  >
                    🔍 Details
                  </button>
                  {proj.demo && (
                    <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="project-link" style={{ fontSize: '0.65rem' }}>
                      🔗 Demo
                    </a>
                  )}
                  {proj.git && (
                    <a href={proj.git} target="_blank" rel="noopener noreferrer" className="project-link" style={{ fontSize: '0.65rem' }}>
                      💻 Code
                    </a>
                  )}
                </div>
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
