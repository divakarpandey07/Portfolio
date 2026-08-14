import React from 'react';
import { IconCheck, IconZap } from './UiIcons';

export default function Toast({ message, visible, icon = 'check' }) {
  if (!visible) return null;

  const renderIcon = () => {
    if (typeof icon !== 'string') return icon;
    if (icon === 'zap') return <IconZap size={16} />;
    return <IconCheck size={16} />;
  };

  return (
    <div className="custom-toast" role="alert" aria-live="assertive">
      <span className="toast-icon">{renderIcon()}</span>
      <span className="toast-text">{message}</span>
    </div>
  );
}
