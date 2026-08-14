import React from 'react';

export default function ProductionTelemetry() {
  const metrics = [
    {
      value: '1,200+',
      label: 'Citizens Empowered',
      subtext: 'digital-pateri Gram Panchayat'
    },
    {
      value: '450+',
      label: 'Grievances Automated',
      subtext: 'Gemini AI ticket classification'
    },
    {
      value: '98.4%',
      label: 'ML Intrusion Accuracy',
      subtext: 'CyberGuard on CICIDS2017'
    },
    {
      value: '256-bit',
      label: 'AES Cipher Security',
      subtext: 'NightShield zero cleartext'
    },
    {
      value: '35%',
      label: 'Classroom Energy Saved',
      subtext: 'IoT automated relay control'
    },
    {
      value: '99.8%',
      label: 'Uptime Reliability',
      subtext: 'Cloud microservice deployments'
    }
  ];

  return (
    <div className="telemetry-strip-container">
      <div className="telemetry-strip-header">
        <span className="accent-text" style={{ fontSize: '0.65rem' }}>PRODUCTION IMPACT &amp; VERIFIED TELEMETRY</span>
        <span className="live-telemetry-badge">LIVE SYSTEMS BENCHMARK</span>
      </div>

      <div className="telemetry-grid">
        {metrics.map((m, idx) => (
          <div key={idx} className="telemetry-box">
            <div className="telemetry-val">{m.value}</div>
            <div className="telemetry-lbl">{m.label}</div>
            <div className="telemetry-sub">{m.subtext}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
