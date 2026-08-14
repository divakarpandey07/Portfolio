import React from 'react';

export default function Toast({ message, visible, icon = '✨' }) {
  if (!visible) return null;

  return (
    <div className="custom-toast" role="alert" aria-live="assertive">
      <span className="toast-icon">{icon}</span>
      <span className="toast-text">{message}</span>
    </div>
  );
}
