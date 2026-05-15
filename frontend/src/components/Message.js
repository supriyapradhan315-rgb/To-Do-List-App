// src/components/Message.js - Alert Message Component

import React from 'react';
import './Message.css';

const Message = ({ text, type }) => {
  // type can be 'success' or 'error'
  return (
    <div className={`message message-${type}`}>
      <span className="message-icon">
        {type === 'success' ? '✅' : '❌'}
      </span>
      <span className="message-text">{text}</span>
    </div>
  );
};

export default Message;
