import React from 'react';

export default function Toast({ message, visible }) {
  if (!visible) return null;

  return (
    <div className="custom-toast" role="alert" aria-live="assertive">
      <span className="toast-text">{message}</span>
    </div>
  );
}
