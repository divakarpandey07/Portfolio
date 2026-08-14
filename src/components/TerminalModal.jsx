import React, { useState, useEffect, useRef } from 'react';

export default function TerminalModal({ isOpen, onClose, onNavigate, onDownloadCV, onShowToast, onOpenPitch }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Divakar Pandey Cyber Terminal v2.4.0 [x86_64-lpu-linux]' },
    { type: 'system', text: 'Type "help" to see available commands, "pitch" for 60s summary, or "certificates" for certs.' }
  ]);
  const [input, setInput] = useState('');
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [pastCommands, setPastCommands] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim().toLowerCase().replace(/\s+/g, ' ');
      const newHistory = [...history, { type: 'user', text: input }];

      if (trimmed) {
        setPastCommands((prev) => [...prev, input]);
        setCmdIndex(-1);
      }

      switch (trimmed) {
        case 'help':
          newHistory.push({
            type: 'output',
            text: `Available Commands:
  • help                 : Display this command list
  • pitch / summary      : Open 60-Second Executive Recruiter Pitch
  • about                : Developer biography & engineering philosophy
  • skills               : List technical stack & core competencies
  • projects / work      : List top featured engineering projects
  • certificates / certs : List all 7 certifications, hackathons & events
  • education / edu      : List full academic degrees & universities
  • resume / cv          : Download Divakar's official Resume (PDF)
  • contact / email      : Display email, phone and LinkedIn info
  • github               : Open GitHub profile in new tab
  • clear / cls          : Clear terminal screen
  • exit / close         : Close terminal`
          });
          break;

        case 'pitch':
        case 'summary':
        case 'executive':
        case 'hire':
          newHistory.push({ type: 'success', text: '⚡ Launching 60-Second Executive Candidate Pitch...' });
          if (onOpenPitch) onOpenPitch();
          break;

        case 'about':
        case 'bio':
          newHistory.push({
            type: 'output',
            text: 'Divakar Pandey: Full-Stack Engineer & MCA candidate at Lovely Professional University. Specializing in AI governance portals (digital-pateri), mobile cryptography (NightShield), and IoT embedded architectures.'
          });
          break;

        case 'skills':
        case 'tech':
        case 'stack':
          newHistory.push({
            type: 'output',
            text: `Technical Arsenal:
  [Languages]   : JavaScript, TypeScript, Java, Python, C++, PHP, SQL
  [Frontend]    : React.js, Vite, Three.js, TailwindCSS, HTML5, CSS3
  [Backend/DB]  : Node.js, Express, MongoDB, MySQL, Firebase
  [AI / ML]     : Google Gemini AI API, Scikit-Learn, Pandas, NumPy
  [IoT / Tools] : ESP32, NodeMCU ESP8266, Git, GitHub, Linux, Android Studio`
          });
          break;

        case 'projects':
        case 'project':
        case 'work':
        case 'portfolio':
          newHistory.push({
            type: 'output',
            text: `Featured Engineering Works:
  1. digital-pateri      [React, Node, Mongo, Gemini AI] -> Smart Gram Panchayat Portal
  2. BharatYatra         [TypeScript, React, Vercel]     -> Interactive Travel Planning
  3. NightShield         [Java, Android, AES-256]        -> Cryptographic Instant Messaging
  4. IoT Digital Class   [ESP32, NodeMCU, C++, Sensors]  -> Automated Smart Classroom
  5. Carbon-Tracker      [React, Chart.js, Tailwind]     -> Climate Footprint Analytics
  6. CyberGuard          [Python, Scikit-Learn, ML]      -> Network Intrusion Detector
  7. Saanidhya           [PHP, MySQL, JavaScript]        -> Student PG & Housing Finder
  8. PeriodicTable       [HTML5, CSS3, JavaScript]       -> Interactive Chemistry Tool`
          });
          break;

        case 'certificates':
        case 'certificate':
        case 'certifications':
        case 'certification':
        case 'certs':
        case 'cert':
        case 'certificates and more':
        case 'certificates & more':
        case 'certifications and more':
        case 'certifications & more':
        case 'certs and more':
        case 'certs & more':
          newHistory.push({
            type: 'output',
            text: `Certificates and More (7 Recognitions & Hackathons):
  1. Modern Technology & Industry-Relevant Careers Workshop (May 2026)
     -> Skillspardha Participant: High-end DevOps & Cloud Standards
  2. Java Programming Certification (Feb - May 2026)
     -> NEO COLAB (NIIT Venture): Multi-threading & Memory Architectures
  3. InnoStart 2025 Innovation Event (Nov 2025)
     -> LPU School of Computer Applications: Prototype Presenter
  4. MSME InnovXperience Exhibition (Oct 2025)
     -> Participant: LPU Startup & Enterprise Cell
  5. AI Agents & The Future of Jobs - Founder's Talk (Sep 2025)
     -> Capabl / Infoity / DSO Participant: Automated Workflow & LLMs
  6. Tech Blitz 2025 - 24Hr Hackathon (Sep 2025)
     -> Coding Ninjas, LPU: Overnight Full-Stack Prototype
  7. Honored for Technical Contributions (Aug 2025)
     -> Recognized for organizational & technical student initiatives`
          });
          break;

        case 'education':
        case 'edu':
        case 'academic':
        case 'degrees':
        case 'college':
        case 'university':
          newHistory.push({
            type: 'output',
            text: `Academic Timeline:
  • 2025 - Present : Lovely Professional University
                     Master of Computer Applications (MCA) — CGPA: 7.36
  • 2023 - 2025    : NIELIT (Varanasi, UP)
                     O Level Computing Certificate
  • 2022 - 2025    : Veer Bahadur Singh Purvanchal University
                     Bachelor of Computer Applications (BCA) — 70%
  • 2021 - 2022    : Mahatma Gandhi Kashi Vidyapith
                     PGDCA (Post Graduate Diploma in Computer Applications) — 56%
  • 2019 - 2021    : Mahatma Gandhi Kashi Vidyapith
                     Bachelor of Science (B.Sc.) — 60%`
          });
          break;

        case 'resume':
        case 'cv':
          newHistory.push({ type: 'success', text: '📥 Initiating download of Divakar_Pandey_Resume.pdf...' });
          onDownloadCV();
          break;

        case 'contact':
        case 'email':
        case 'phone':
          newHistory.push({
            type: 'output',
            text: `Contact Channels:
  • Email   : pandeydivakar07@gmail.com
  • Phone   : +91 6394163494
  • LinkedIn: linkedin.com/in/divakar6394163494
  • GitHub  : github.com/divakarpandey07`
          });
          break;

        case 'github':
        case 'git':
        case 'repo':
          window.open('https://github.com/divakarpandey07', '_blank');
          newHistory.push({ type: 'success', text: 'Opening GitHub profile in new tab...' });
          break;

        case 'clear':
        case 'cls':
          setHistory([]);
          setInput('');
          return;

        case 'exit':
        case 'close':
        case 'quit':
        case 'q':
          onClose();
          return;

        case '':
          break;

        default:
          newHistory.push({
            type: 'error',
            text: `Command not found: "${input}". Type "help" for a list of available commands.`
          });
      }

      setHistory(newHistory);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIdx = cmdIndex === -1 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInput(pastCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (pastCommands.length > 0 && cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= pastCommands.length) {
          setCmdIndex(-1);
          setInput('');
        } else {
          setCmdIndex(nextIdx);
          setInput(pastCommands[nextIdx]);
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-backdrop" onClick={onClose}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-titlebar">
          <div className="terminal-dots">
            <span className="dot-red" onClick={onClose} title="Close" />
            <span className="dot-yellow" />
            <span className="dot-green" />
          </div>
          <div className="terminal-title">divakar@portfolio: ~ (bash)</div>
          <div className="terminal-help-hint">ESC to close</div>
        </div>

        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((line, idx) => (
            <div key={idx} className={`terminal-line ${line.type}`}>
              {line.type === 'user' ? (
                <span>
                  <span className="terminal-prompt">divakar@portfolio:~$</span> {line.text}
                </span>
              ) : (
                <pre>{line.text}</pre>
              )}
            </div>
          ))}

          <div className="terminal-input-row">
            <span className="terminal-prompt">divakar@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
              spellCheck="false"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
