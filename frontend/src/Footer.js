import React from "react";

const Footer = ({ handleAboutClick }) => {
  return (
    <footer className="footer">
      <p>
        © 2025 - Trip Logger <span className="square-bullet"></span>{" "}
        <a href="#" onClick={handleAboutClick}>
          About
        </a>{" "}
        <span className="square-bullet"></span>{" "}
        <a
          href="https://aklilumandefro.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </a>
      </p>
    </footer>
  );
};

export default Footer;
