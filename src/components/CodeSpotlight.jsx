import React, { useState } from 'react';

const SNIPPETS = [
  {
    id: 'gemini-gov',
    title: 'GeminiAI_Gov.js',
    lang: 'JavaScript',
    project: 'digital-pateri',
    desc: 'Automated civic grievance classification & multilingual citizen assistant logic using Gemini API.',
    code: `// digital-pateri: AI Civic Guidance & Scheme Recommendation
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function processCitizenInquiry(prompt, citizenLang = 'hi') {
  const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const systemContext = \`
    You are the official Smart Assistant for Pateri Gram Panchayat.
    Guide citizens on certificates, housing schemes, and grievance tickets.
    Respond with empathetic, legally accurate steps in \${citizenLang}.
  \`;

  const response = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: systemContext + prompt }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 500 }
  });

  return response.text();
}`
  },
  {
    id: 'aes-cipher',
    title: 'AESCipher.java',
    lang: 'Java',
    project: 'NightShield',
    desc: 'Client-side AES-256 GCM cryptographic cipher pipeline for encrypted Android communications.',
    code: `// NightShield: Cryptographic AES-256 Messaging Pipeline
package com.divakar.nightshield.crypto;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.util.Base64;

public class AESCipher {
    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int TAG_LENGTH_BIT = 128;
    private static final int IV_LENGTH_BYTE = 12;

    public static String encrypt(String plainText, SecretKey key, byte[] iv) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        GCMParameterSpec spec = new GCMParameterSpec(TAG_LENGTH_BIT, iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, spec);
        
        byte[] cipherText = cipher.doFinal(plainText.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(cipherText);
    }
}`
  },
  {
    id: 'iot-telemetry',
    title: 'IoT_Telemetry.cpp',
    lang: 'C++ / Arduino',
    project: 'IoT Digital Classroom',
    desc: 'ESP32 & NodeMCU multi-sensor telemetry handler with real-time Firebase synchronization.',
    code: `// IoT Digital Classroom: ESP32 Multi-Sensor Telemetry
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <DHT.h>

#define DHTPIN D4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void syncClassroomTelemetry() {
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  if (!isnan(temp) && !isnan(humidity)) {
    Firebase.setFloat("classroom_01/telemetry/temperature", temp);
    Firebase.setFloat("classroom_01/telemetry/humidity", humidity);
    Firebase.setString("classroom_01/status", "ACTIVE_OPTIMAL");
  }
}`
  }
];

export default function CodeSpotlight({ onShowToast }) {
  const [activeTab, setActiveTab] = useState(0);
  const snippet = SNIPPETS[activeTab];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(snippet.code);
    onShowToast(`Copied ${snippet.title} snippet! 📋`, '💻');
  };

  return (
    <div className="code-spotlight-card">
      <div className="code-spotlight-header">
        <div className="code-tabs">
          {SNIPPETS.map((snip, idx) => (
            <button
              key={snip.id}
              className={`code-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className="code-tab-dot" />
              <span>{snip.title}</span>
            </button>
          ))}
        </div>

        <button className="copy-code-btn" onClick={handleCopyCode} title="Copy Snippet">
          <span>📋 Copy Code</span>
        </button>
      </div>

      <div className="code-meta-bar">
        <span className="code-lang-tag">{snippet.lang}</span>
        <span className="code-proj-tag">Project: <strong>{snippet.project}</strong></span>
        <span className="code-desc">{snippet.desc}</span>
      </div>

      <div className="code-editor-body">
        <pre className="code-pre">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
}
