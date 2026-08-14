import React, { useState, useEffect, useRef } from 'react';

export default function TerminalModal({ isOpen, onClose, onNavigate, onDownloadCV, onShowToast }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Divakar Pandey Cyber Terminal v2.4.0 [x86_64-lpu-linux]' },
    { type: 'system', text: 'Type "help" to see available commands or "projects" to list work.' }
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
      const trimmed = input.trim().toLowerCase();
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
  • help          : Display this command list
  • about         : Brief developer summary & philosophy
  • skills        : List technical skills and core proficiencies
  • projects      : List top featured engineering projects
  • resume / cv   : Download Divakar's official Resume (PDF)
  • contact       : Display email, phone and LinkedIn info
  • github        : Open GitHub profile
  • clear         : Clear terminal screen
  • exit / close  : Close the terminal`
          });
          break;

        case 'about':
          newHistory.push({
            type: 'output',
            text: 'Divakar Pandey: Full-Stack Engineer & MCA candidate at LPU. Specializing in AI governance portals (digital-pateri), mobile cryptography (NightShield), and IoT embedded architectures.'
          });
          break;

        case 'skills':
          newHistory.push({
            type: 'output',
            text: `Technical Stack:
  [Languages]   : JavaScript, TypeScript, Java, Python, C++, PHP, SQL
  [Frontend]    : React.js, Vite, Three.js, TailwindCSS, HTML5, CSS3
  [Backend/DB]  : Node.js, Express, MongoDB, MySQL, Firebase
  [AI / ML]     : Google Gemini API, Scikit-Learn, Pandas, NumPy
  [IoT / Tools] : ESP32, NodeMCU, Git, GitHub, Linux, Android Studio`
          });
          break;

        case 'projects':
          newHistory.push({
            type: 'output',
            text: `Top Featured Works:
  1. digital-pateri      [React, Node, Mongo, Gemini AI] -> Smart Gram Panchayat Portal
  2. BharatYatra         [TypeScript, React, Vercel]     -> Interactive Travel Platform
  3. NightShield         [Java, Android, AES-256]        -> Cryptographic Chat App
  4. IoT Digital Class   [ESP32, NodeMCU, C++, Sensors]  -> Automated Smart Classroom
  5. Carbon-Tracker      [React, Chart.js, Tailwind]     -> Climate Emission Analytics
  6. CyberGuard          [Python, Scikit-Learn, ML]      -> Network Intrusion Detector`
          });
          break;

        case 'resume':
        case 'cv':
          newHistory.push({ type: 'success', text: '📥 Initiating download of Divakar_Pandey_Resume.pdf...' });
          onDownloadCV();
          break;

        case 'contact':
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
          window.open('https://github.com/divakarpandey07', '_blank');
          newHistory.push({ type: 'success', text: 'Opening GitHub profile in new tab...' });
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case 'exit':
        case 'close':
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
