import React from "react";

const Header = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <h1
      className="logo-content"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src="/trip-logger-logo.png"
        alt="Trip Logger Logo"
        style={{ width: "70px", height: "35px", marginRight: "10px" }}
      />
      Trip Logger
    </h1>
  );
};

export default Header;
