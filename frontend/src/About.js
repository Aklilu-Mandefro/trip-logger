import React from "react";
import "./App.css";

const About = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>About Trip Logger</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default About;
