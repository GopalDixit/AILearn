import React from "react";
import MultipleTextsTypingAnimation from "./MultipleTextsTypingAnimation";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import "./MainComponent.css"; // Importing CSS file for styling

const MainComponent = ({ darkMode, setDarkMode,scrollToTrending }) => {
  return (
    <div className="main-container">
      <div className="content">
        <div className="text-content">
          <h1>
            All Your <span style={{ color: "#fc6d6d" }}>SmartLearn</span>
          </h1>
          <MultipleTextsTypingAnimation
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <span className={darkMode ? "text-content1" : ""}>
            <p>
            AI-Powered Learning Management System with Mock Interview Platform enhances career readiness through AI-driven learning and real-time interview simulations. It uses NLP, ML, and Speech Recognition to provide personalized feedback, improving communication skills and confidence.
            </p>
          </span>
          <div className="buttons">
            <button  className="btn1"><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/Courses">Our Courses</Link></button>
            <button onClick={scrollToTrending} className="btn2">Available Courses</button>
          </div>
        </div>
        <div className="image-content">
          <img src="aipower.png" alt="Attractive Image" />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
