// import React from "react";
import React, { useState } from "react";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { TiAdjustBrightness } from "react-icons/ti";
import { useAuth0 } from "@auth0/auth0-react";
// import "./HamburgerMenu.css"; // Import CSS file for styling

const HamburgerMenu = ({ darkMode, setDarkMode }) => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-button" onClick={handleToggle}>
        ☰
      </button>
      {isOpen && (
        <ul className="menu-items">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/Courses">Courses</Link>
              </li>
              <li>
                <Link to="/Notepad">WorkSpace</Link>
              </li>
              <li>
                <Link to="/ChatWithAI">ChatWithAI</Link>
              </li>
              <li>
                <Link to="/MockInterviw">MockInterview</Link>
              </li>
              <li>
                <Link to="/Player">VideoPlayer</Link>
              </li>
              <li>
                <Link to="/PdfUploadComponent">Add Pdf</Link>
              </li>
              <li>
                <Link to="/AboutUs">About Us</Link>
              </li>

              <li>
                <Link to="/Contact">Contact Us</Link>
              </li>
            </>
          ) : (
            <li className="temp">Login For Full Access </li>
          )}
          {isAuthenticated && (
            <li>
              <p style={{ color: "#fc6d6d" }}>Hi {user.name}</p>
            </li>
          )}
          <div className="navbar-buttons">
            <button
              className={darkMode ? "DarkActive" : "DarkIcon"}
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <TiAdjustBrightness fill={darkMode ? "#fff" : ""} />
              ) : (
                <MdDarkMode fill={darkMode ? "#fff" : ""} />
              )}
            </button>
            {isAuthenticated ? (
              <Link
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                to="/signup"
                className="signup-button"
              >
                LogOut
              </Link>
            ) : (
              <Link
                onClick={() => loginWithRedirect()}
                to="/login"
                className="login-button"
              >
                Login
              </Link>
            )}
          </div>
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;
