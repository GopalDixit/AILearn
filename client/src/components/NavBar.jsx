import React from "react";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import { MdDarkMode } from "react-icons/md";
import { TiAdjustBrightness } from "react-icons/ti";
import { useAuth0 } from "@auth0/auth0-react";
import Notepad from "./Notepad";
// import logo from "./logo.png"; // Import your logo image
// import "./Navbar.css";

const NavBar = ({ darkMode, setDarkMode }) => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src="AIPOWLOGO.png" alt="Logo" className="logo-image" />
          <span className={darkMode ? "dark" : " "}>AI-Powered SmartLearn</span>
        </Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-menu">
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
                <Link to="/MockInterview">MockInterview</Link>
              </li>
              <li>
                <Link to="/Compiler">Compiler</Link>
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
        </ul>
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
      </div>
      <HamburgerMenu darkMode={darkMode} setDarkMode={setDarkMode} />
    </nav>
  );
};

export default NavBar;
