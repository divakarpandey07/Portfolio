import React, { useEffect, useState, useRef } from 'react';
import ThreeScene from './ThreeScene';
import Lenis from 'lenis';
import Toast from './components/Toast';
import CommandPalette from './components/CommandPalette';
import ProjectModal from './components/ProjectModal';
import MobileNav from './components/MobileNav';
import TerminalModal from './components/TerminalModal';
import CodeSpotlight from './components/CodeSpotlight';
import ThemeSwitcher from './components/ThemeSwitcher';
import Typewriter from './components/Typewriter';
import GithubStatsCard from './components/GithubStatsCard';
import RecruiterPitchModal from './components/RecruiterPitchModal';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'education-skills', label: 'Education & Skills' },
  { id: 'featured-projects', label: 'Featured Projects' },
  { id: 'certifications', label: 'Certificates' },
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
    architectureFlow: [
      { title: 'Citizen Interface', detail: 'React.js & Tailwind responsive portal' },
      { title: 'API Gateway', detail: 'Express.js & Node REST controllers' },
      { title: 'AI Engine', detail: 'Gemini 1.5 Flash assistant & classification' },
      { title: 'Data Layer', detail: 'MongoDB Atlas & secure document vault' }
    ],
    highlights: [
      'Engineered citizen grievance redressal pipeline with real-time status tracking and automated officer routing.',
      'Integrated Google Gemini AI assistant for voice/text civic inquiries and automated government scheme recommendations.',
      'Designed tamper-proof digital certificates and citizen document vault with role-based access control.',
      'Responsive full-stack architecture built with React.js, Express/Node.js, and MongoDB.'
    ],
    img: '/digital_pateri_ss.png',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Gemini AI', 'REST API', 'JavaScript'],
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
    architectureFlow: [
      { title: 'Client UI', detail: 'React.js & TypeScript with Framer Motion' },
      { title: 'Routing Engine', detail: 'Interactive state & destination filters' },
      { title: 'Budget Calculator', detail: 'Real-time regional cost estimation' },
      { title: 'Edge Cloud', detail: 'Vercel global low-latency CDN' }
    ],
    highlights: [
      'Interactive regional destination guides with curated media and high-resolution visual storytelling.',
      'Real-time itinerary builder with dynamic budget estimates and transit mapping.',
      'Clean modern UI crafted with TypeScript and React.js, optimized for zero-latency page transitions.'
    ],
    img: '/bharat_yatra_ss.png',
    tech: ['TypeScript', 'React.js', 'Vercel', 'TailwindCSS', 'JavaScript'],
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
    architectureFlow: [
      { title: 'Android UI', detail: 'Native Java & Material Design 3' },
      { title: 'Client Crypto', detail: 'AES-256 GCM cipher & key hashing' },
      { title: 'Sync Pipeline', detail: 'Firebase Realtime Database sockets' },
      { title: 'Decryption Vault', detail: 'Client-side verification & rendering' }
    ],
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
    architectureFlow: [
      { title: 'Hardware Edge', detail: 'ESP32 & NodeMCU microcontrollers (C++)' },
      { title: 'Sensor Hub', detail: 'RFID RC522, PIR motion & DHT11 sensors' },
      { title: 'Cloud Sync', detail: 'Firebase Realtime Database live sync' },
      { title: 'Actuators', detail: 'Automated relays for lights & fans' }
    ],
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
    architectureFlow: [
      { title: 'Telemetry Input', detail: 'Travel, energy & lifestyle metrics form' },
      { title: 'Emission Engine', detail: 'Verified climate emission factor algorithms' },
      { title: 'Analytics UI', detail: 'Chart.js dynamic visual breakdowns' }
    ],
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
    architectureFlow: [
      { title: 'Network Stream', detail: 'CICIDS2017 flow data packet ingestion' },
      { title: 'Feature Pipeline', detail: 'Pandas & NumPy statistical normalization' },
      { title: 'ML Classifier', detail: 'XGBoost & Random Forest 98.4% model' },
      { title: 'Alert Console', detail: 'Automated intrusion threat reporting' }
    ],
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
    architectureFlow: [
      { title: 'Search UI', detail: 'Budget, distance & amenities filter form' },
      { title: 'Server Logic', detail: 'PHP backend controllers & validation' },
      { title: 'Relational DB', detail: 'MySQL schema & photo galleries' }
    ],
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
    architectureFlow: [
      { title: 'Element Matrix', detail: '118 elements grid with periodic grouping' },
      { title: 'Property Engine', detail: 'Dynamic orbital & atomic state modals' }
    ],
    highlights: [
      'Interactive element grid with instant property modals and group/period filter highlighting.',
      'Lightweight vanilla JavaScript architecture with zero heavy dependencies.'
    ],
    img: '/periodic_table_ss.png',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Education Tech'],
    git: 'https://github.com/divakarpandey07/PeriodicTable'
  }
];

const SKILLS_LIST = [
  { name: 'React.js', emoji: '⚛️', category: 'frontend', projects: ['digital-pateri', 'bharat-yatra', 'carbon-tracker'] },
  { name: 'Node.js', emoji: '🟢', category: 'backend', projects: ['digital-pateri'] },
  { name: 'Gemini AI', emoji: '🤖', category: 'ai', projects: ['digital-pateri'] },
  { name: 'Java', emoji: '☕', category: 'mobile', projects: ['nightshield'] },
  { name: 'Android Studio', emoji: '📱', category: 'mobile', projects: ['nightshield'] },
  { name: 'Python', emoji: '🐍', category: 'ai', projects: ['cyberguard'] },
  { name: 'C++', emoji: '⚙️', category: 'systems', projects: ['iot-classroom'] },
  { name: 'ESP32 / IoT', emoji: '🔌', category: 'systems', projects: ['iot-classroom'] },
  { name: 'SQL / MySQL', emoji: '💾', category: 'backend', projects: ['saanidhya'] },
  { name: 'MongoDB', emoji: '🍃', category: 'backend', projects: ['digital-pateri'] },
  { name: 'TypeScript', emoji: '🟦', category: 'frontend', projects: ['bharat-yatra'] },
  { name: 'Git & GitHub', emoji: '🌿', category: 'tools', projects: ['digital-pateri', 'bharat-yatra', 'nightshield', 'iot-classroom'] }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [view, setView] = useState('main');

  // Interactive states
  const [cmdOpen, setCmdOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [pitchOpen, setPitchOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [projectCategory, setProjectCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', icon: '✨' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSending, setFormSending] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // null | 'sending' | 'success' | 'fallback'

  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
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

  // Keyboard shortcuts listener for Cmd+K and ` (Terminal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === '`' && !e.metaKey && !e.ctrlKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Ultra-Fast Native Momentum Scroll for Mobile, Lenis for Desktop
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && (
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.innerWidth <= 992
    );

    let lenis = null;
    let rafId = 0;

    const handleScrollUpdate = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      
      const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);
      document.documentElement.style.setProperty('--scroll', String(progress));

      const scrollPos = scrollY + window.innerHeight * 0.35;
      let currentSection = 'hero';

      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    if (!isTouch) {
      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 0
      });
      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      lenis.on('scroll', handleScrollUpdate);
    } else {
      window.addEventListener('scroll', handleScrollUpdate, { passive: true });
    }

    setTimeout(handleScrollUpdate, 100);

    const handleResize = () => handleScrollUpdate();
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        window.lenis = null;
      }
      window.removeEventListener('scroll', handleScrollUpdate);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mouse Move tracking for desktop cursor and 3D parallax
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return;

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
        target.closest('.comp-card') ||
        target.closest('.dot-wrapper') ||
        target.closest('.hud-nav-item') ||
        target.closest('.hud-logo') ||
        target.closest('.btn-primary') ||
        target.closest('.btn-outline') ||
        target.closest('.btn-pitch');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const scrollToSection = (id) => {
    if (view !== 'main') {
      setView('main');
      setTimeout(() => {
        const targetRef = sectionRefs[id];
        if (targetRef && targetRef.current) {
          if (window.lenis) {
            window.lenis.scrollTo(targetRef.current, { duration: 1.0 });
          } else {
            targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
      return;
    }

    const targetRef = sectionRefs[id];
    if (targetRef && targetRef.current) {
      if (window.lenis) {
        window.lenis.scrollTo(targetRef.current, {
          duration: 1.0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSkillClick = (skill) => {
    if (selectedSkill?.name === skill.name) {
      setSelectedSkill(null);
      showToast('Skill filter cleared', '🔄');
    } else {
      setSelectedSkill(skill);
      showToast(`Highlighting projects built with ${skill.name} ⚡`, '🔍');
      scrollToSection('featured-projects');
    }
  };

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (selectedSkill && !selectedSkill.projects.includes(p.id)) return false;
    if (projectCategory !== 'all' && p.category !== projectCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.desc.toLowerCase().includes(q) || (p.longDesc && p.longDesc.toLowerCase().includes(q));
      const matchTech = p.tech.some((t) => t.toLowerCase().includes(q));
      const matchCat = p.categoryLabel && p.categoryLabel.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchTech || matchCat;
    }
    return true;
  });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormSending(true);
    setFormStatus('sending');

    try {
      const res = await fetch('https://formsubmit.co/ajax/pandeydivakar07@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          _subject: `🚀 Portfolio Message from ${contactForm.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await res.json();

      if (res.ok && (data.success === 'true' || data.success === true)) {
        setFormSending(false);
        setFormStatus('success');
        setContactForm({ name: '', email: '', message: '' });
        showToast('Message delivered directly to Divakar\'s Inbox! 🚀', '✅');
        setTimeout(() => setFormStatus(null), 6000);
      } else {
        throw new Error('Direct submission failed');
      }
    } catch {
      setFormSending(false);
      setFormStatus('fallback');
      showToast('Opening mail client to complete dispatch...', '✉️');
      window.location.href = `mailto:pandeydivakar07@gmail.com?subject=Contact from ${encodeURIComponent(contactForm.name)}&body=${encodeURIComponent(contactForm.message)}%0A%0AFrom: ${encodeURIComponent(contactForm.email)}`;
      setTimeout(() => setFormStatus(null), 6000);
    }
  };

  return (
    <>
      {/* Floating Custom Cursor (Desktop only) */}
      <div
        className={`cursor-follower ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

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
        onOpenPitch={() => setPitchOpen(true)}
      />

      {/* Interactive Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onNavigate={scrollToSection}
        onDownloadCV={handleDownloadCV}
        onShowToast={showToast}
        onOpenPitch={() => setPitchOpen(true)}
      />

      {/* Recruiter 60-Second Pitch Modal */}
      <RecruiterPitchModal
        isOpen={pitchOpen}
        onClose={() => setPitchOpen(false)}
        onDownloadCV={handleDownloadCV}
        onNavigateToContact={() => scrollToSection('contact')}
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
          <ThreeScene scrollProgress={scrollProgress} />
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
                <ThemeSwitcher onShowToast={showToast} />

                <button
                  className="hud-cmd-btn terminal-trigger"
                  onClick={() => setTerminalOpen(true)}
                  title="Open Developer Terminal (`)"
                  aria-label="Open Terminal"
                >
                  <span>&gt;_</span>
                </button>

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
                className="scroll-section align-left"
              >
                <div className="glass-card hero-card">
                  <div className="live-status-pill">
                    <span className="live-status-dot"></span>
                    <span className="live-status-text">AVAILABLE FOR ROLES &amp; INNOVATIONS</span>
                  </div>

                  <span className="accent-text">WELCOME TO THE EXHIBITION</span>
                  
                  <h1 className="shimmer-title hero-heading">
                    Creative<br />Developer.
                  </h1>

                  {/* Dynamic Typewriter Role Tagline */}
                  <Typewriter />

                  <div className="divider"></div>

                  <p className="hero-bio">
                    I am <strong>Divakar Pandey</strong>, Full-Stack Software Engineer &amp; MCA Candidate at Lovely Professional University.
                  </p>
                  <p className="hero-desc">
                    Specializing in high-performance web applications, AI-assisted governance systems, and secure mobile &amp; IoT architectures.
                  </p>

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
                      className="btn-pitch"
                      onClick={() => setPitchOpen(true)}
                      id="hero-pitch-btn"
                      title="Open 60-Second Executive Summary"
                    >
                      <span>⚡ 60-Sec Pitch</span>
                    </button>

                    <button
                      className="btn-outline"
                      onClick={() => scrollToSection('about')}
                      id="hero-about-btn"
                    >
                      <span>About Me</span>
                      <span className="btn-icon">👤</span>
                    </button>
                  </div>

                  <div className="hero-social-links">
                    <a
                      href="https://github.com/divakarpandey07"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                    >
                      🐙 GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/divakar6394163494/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                    >
                      🔗 LinkedIn
                    </a>
                    <a
                      href="mailto:pandeydivakar07@gmail.com"
                      className="social-icon-link"
                    >
                      ✉️ Email
                    </a>
                    <button
                      className="social-icon-link cmd-trigger-text"
                      onClick={() => setTerminalOpen(true)}
                    >
                      &gt;_ Terminal
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

              {/* SECTION 2: ABOUT ME & PHILOSOPHY */}
              <section
                id="about"
                ref={sectionRefs.about}
                className="scroll-section align-center"
              >
                <div className="glass-card about-bento-card">
                  <div className="about-header-badge">
                    <span className="accent-text">BIOGRAPHY &amp; ENGINEERING MINDSET</span>
                    <h2 className="shimmer-title about-main-title">Divakar Pandey</h2>
                    <p className="about-subtitle">Full-Stack Software Engineer • MCA Candidate • Tech Innovator</p>
                  </div>

                  <div className="divider" style={{ margin: '20px auto 32px' }}></div>

                  <div className="about-grid-container">
                    {/* Left Column: Portrait & Credentials */}
                    <div className="about-left-col">
                      <div className="portrait-frame">
                        <img
                          src="/divakar_profile.jpg"
                          alt="Divakar Pandey in professional blue suit"
                          className="portrait-photo"
                        />
                        <div className="portrait-tag">
                          <span className="live-status-dot" style={{ width: '6px', height: '6px' }}></span>
                          <span>MCA SOFTWARE ENGINEER</span>
                        </div>
                      </div>

                      {/* Stat Metrics Grid */}
                      <div className="about-mini-stats">
                        <div className="mini-stat-item">
                          <div className="stat-value">MCA</div>
                          <div className="stat-desc">LPU • 7.36 CGPA</div>
                        </div>
                        <div className="mini-stat-item">
                          <div className="stat-value">8+</div>
                          <div className="stat-desc">Projects Shipped</div>
                        </div>
                        <div className="mini-stat-item">
                          <div className="stat-value">7+</div>
                          <div className="stat-desc">Certs &amp; Hackathons</div>
                        </div>
                        <div className="mini-stat-item">
                          <div className="stat-value">100%</div>
                          <div className="stat-desc">Committed to Quality</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Bio Narrative & Core Pillars */}
                    <div className="about-right-col">
                      <div className="about-bio-block">
                        <p>
                          I am a <strong>Software Engineer &amp; MCA Candidate at Lovely Professional University</strong> driven by the challenge of designing scalable architectures, intelligent AI models, and mission-critical software solutions.
                        </p>
                        <p style={{ marginTop: '12px' }}>
                          My engineering journey spans from developing <strong>digital-pateri</strong> (an AI-governed Smart Village portal serving real citizens in Pateri Gram Panchayat) to building <strong>NightShield</strong> (client-side encrypted messaging mobile app) and automated <strong>IoT Digital Classrooms</strong> with microcontrollers.
                        </p>
                      </div>

                      {/* 4 Core Competency Cards */}
                      <div className="about-competencies-grid">
                        <div className="comp-card">
                          <div className="comp-icon">💻</div>
                          <div>
                            <div className="comp-title">Full-Stack Web Systems</div>
                            <div className="comp-desc">React.js, Node.js, Express, TypeScript, MongoDB, MySQL &amp; Cloud.</div>
                          </div>
                        </div>

                        <div className="comp-card">
                          <div className="comp-icon">🤖</div>
                          <div>
                            <div className="comp-title">Applied AI &amp; LLM Logic</div>
                            <div className="comp-desc">Gemini AI API assistants, Python, Scikit-Learn intrusion classifiers.</div>
                          </div>
                        </div>

                        <div className="comp-card">
                          <div className="comp-icon">🔒</div>
                          <div>
                            <div className="comp-title">Mobile Security &amp; Android</div>
                            <div className="comp-desc">Java, Android Studio, AES-256 cryptography, Firebase Realtime.</div>
                          </div>
                        </div>

                        <div className="comp-card">
                          <div className="comp-icon">⚡</div>
                          <div>
                            <div className="comp-title">IoT &amp; Embedded Hardware</div>
                            <div className="comp-desc">ESP32, NodeMCU ESP8266, C++, RFID &amp; climate telemetry sensors.</div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="about-action-bar">
                        <button
                          className="btn-primary-small"
                          onClick={handleDownloadCV}
                        >
                          📄 Download Official CV (PDF)
                        </button>
                        <button
                          className="btn-outline-small"
                          onClick={() => setPitchOpen(true)}
                        >
                          ⚡ 60s Recruiter Pitch
                        </button>
                        <button
                          className="btn-outline-small"
                          onClick={() => scrollToSection('contact')}
                        >
                          ✉️ Get In Touch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: EDUCATION & SKILLS */}
              <section
                id="education-skills"
                ref={sectionRefs['education-skills']}
                className="scroll-section align-right"
              >
                <div className="glass-card">
                  <span className="accent-text">JOURNEY &amp; CAPABILITIES</span>
                  <h2>Education &amp; Skills</h2>

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
                    <span className="accent-text" style={{ fontSize: '0.65rem' }}>INTERACTIVE TECHNICAL ARSENAL (CLICK TO FILTER PROJECTS)</span>
                  </div>

                  <div className="badge-container" style={{ marginTop: '16px', gap: '10px' }}>
                    {SKILLS_LIST.map((sk) => (
                      <button
                        key={sk.name}
                        className={`bounce-badge ${selectedSkill?.name === sk.name ? 'skill-active' : ''}`}
                        onClick={() => handleSkillClick(sk)}
                        title={`Click to view projects using ${sk.name}`}
                      >
                        <span className="badge-emoji">{sk.emoji}</span>
                        <span>{sk.name}</span>
                      </button>
                    ))}
                  </div>

                  {selectedSkill && (
                    <div className="skill-filter-notice">
                      <span>Filtered by skill: <strong>{selectedSkill.name}</strong></span>
                      <button className="clear-skill-btn" onClick={() => setSelectedSkill(null)}>✕ Clear</button>
                    </div>
                  )}
                </div>
              </section>

              {/* SECTION 4: FEATURED PROJECTS */}
              <section
                id="featured-projects"
                ref={sectionRefs['featured-projects']}
                className="scroll-section align-left"
              >
                <div className="glass-card" style={{ maxWidth: '780px' }}>
                  <span className="accent-text">SELECTED WORK</span>
                  <h2>Featured Projects</h2>

                  <div className="divider"></div>

                  {/* Instant Keyword Search Bar */}
                  <div className="project-search-container">
                    <div className="project-search-input-wrapper">
                      <span className="search-icon">🔍</span>
                      <input
                        type="text"
                        className="project-search-input"
                        placeholder="Search projects by tech (e.g. Gemini, Java, IoT, React, Android)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button
                          className="search-clear-btn"
                          onClick={() => setSearchQuery('')}
                          title="Clear search"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    {searchQuery && (
                      <div className="search-results-count">
                        Found {filteredProjects.length} matching project{filteredProjects.length === 1 ? '' : 's'}
                      </div>
                    )}
                  </div>

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
                        className={`filter-pill ${projectCategory === tab.key && !selectedSkill && !searchQuery ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedSkill(null);
                          setSearchQuery('');
                          setProjectCategory(tab.key);
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="project-grid-responsive">
                    {filteredProjects.length === 0 ? (
                      <div className="no-projects-found">
                        <span className="no-proj-icon">🔍</span>
                        <p>No projects found matching "<strong>{searchQuery}</strong>".</p>
                        <button className="clear-skill-btn" onClick={() => { setSearchQuery(''); setSelectedSkill(null); setProjectCategory('all'); }}>
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      filteredProjects.slice(0, 4).map((proj) => (
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

                          <div className="badge-container" style={{ marginTop: '10px' }}>
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
                      ))
                    )}
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

                  {/* Architecture Code Snippet Spotlight */}
                  <div style={{ marginTop: '48px' }}>
                    <div style={{ marginBottom: '14px' }}>
                      <span className="accent-text" style={{ fontSize: '0.65rem' }}>LIVE ARCHITECTURE CODE SPOTLIGHT</span>
                    </div>
                    <CodeSpotlight onShowToast={showToast} />
                  </div>

                  {/* GitHub Activity & Language Breakdown Card */}
                  <div style={{ marginTop: '32px' }}>
                    <div style={{ marginBottom: '14px' }}>
                      <span className="accent-text" style={{ fontSize: '0.65rem' }}>OPEN SOURCE &amp; REPOSITORY STATS</span>
                    </div>
                    <GithubStatsCard />
                  </div>
                </div>
              </section>

              {/* SECTION 5: CERTIFICATES AND MORE */}
              <section
                id="certifications"
                ref={sectionRefs.certifications}
                className="scroll-section align-right"
              >
                <div className="glass-card">
                  <span className="accent-text">RECOGNITIONS &amp; DEVELOPMENT</span>
                  <h2>Certificates and more</h2>

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
                    View All 7 Certificates &amp; Hackathons →
                  </button>
                </div>
              </section>

              {/* SECTION 6: CONTACT & RESUME */}
              <section
                id="contact"
                ref={sectionRefs.contact}
                className="scroll-section align-center"
              >
                <div className="glass-card" style={{ maxWidth: '720px' }}>
                  <span className="accent-text">SAY HELLO // COLLABORATE</span>
                  <h2>Get In Touch</h2>

                  <div className="divider" style={{ margin: '28px auto' }}></div>

                  <p style={{ textAlign: 'center' }}>
                    Have an interesting project, full-time engineering opportunity, or research collaboration? My inbox is always open.
                  </p>

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

                  <form className="contact-quick-form" onSubmit={handleContactSubmit}>
                    {formStatus === 'success' && (
                      <div className="form-status-banner success">
                        <span>✅ Message sent directly to Divakar's Gmail inbox! Expect a prompt reply.</span>
                      </div>
                    )}
                    {formStatus === 'sending' && (
                      <div className="form-status-banner sending">
                        <span>⏳ Transmitting message securely to pandeydivakar07@gmail.com...</span>
                      </div>
                    )}

                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        className="form-input"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        disabled={formSending}
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        className="form-input"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        disabled={formSending}
                      />
                    </div>
                    <textarea
                      placeholder="Your Message or Project Opportunity..."
                      required
                      rows={3}
                      className="form-input form-textarea"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      disabled={formSending}
                    />
                    <button type="submit" className="btn-primary" disabled={formSending}>
                      <span>{formSending ? 'Transmitting to Gmail...' : 'Send Message 🚀'}</span>
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
    pageTitle = 'Certificates and more';
    pageSubtitle = 'Recognitions, courses and hackathon history';
  }

  return (
    <section className="scroll-section align-center" style={{ minHeight: 'auto', padding: '100px 0 60px' }}>
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
                className="project-card"
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
                <div className="badge-container" style={{ marginTop: '12px' }}>
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
            <div className="timeline">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="timeline-item"
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
            <div className="timeline">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="timeline-item"
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
