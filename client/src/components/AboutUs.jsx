import React from "react";

const AboutUs = ({ darkMode, setDarkMode }) => {
  return (
    <section className="about-us">
      <div className="container">
        <h1 className={darkMode ? "dark" : ""}>
          About AI-Powered Learning & Mock Interview Platform
        </h1>
        <p className={`intro ${darkMode ? "dark" : ""}`}>
          Our AI-powered platform is designed to revolutionize interview
          preparation by integrating advanced learning management with real-time
          mock interviews. Using cutting-edge AI technologies, we offer
          personalized feedback and adaptive learning paths to help users
          enhance their communication skills and confidence.
        </p>

        <div className="feature">
          <img src="first.png" alt="AI Agent" className="feature-image" />
          <div className="feature-content">
            <h2>Intelligent AI-Powered Mock Interviews</h2>
            <p>
              Our system leverages Natural Language Processing (NLP), Machine
              Learning (ML), and Speech Recognition to analyze user responses
              and provide real-time feedback on clarity, accuracy, and
              confidence. This ensures a comprehensive and effective interview
              preparation experience.
            </p>
          </div>
        </div>

        <div className="feature">
          <img
            src="second.png"
            alt="Personalized Learning"
            className="feature-image"
          />
          <div className="feature-content">
            <h2>Personalized Learning Management System</h2>
            <p>
              Integrated with a robust Learning Management System (LMS), our
              platform offers tailored learning paths based on user performance.
              AI-driven analytics help identify strengths and areas for
              improvement, ensuring continuous skill development.
            </p>
          </div>
        </div>

        <div className="feature">
          <img
            src="third.png"
            alt="Performance Tracking"
            className="feature-image"
          />
          <div className="feature-content">
            <h2>Real-Time Performance Analytics</h2>
            <p>
              Our platform generates automated performance reports, tracking
              user progress with key metrics such as response structure
              accuracy, speech clarity, and confidence levels. This data-driven
              approach helps users refine their skills and improve over time.
            </p>
          </div>
        </div>

        <div className="feature">
          <img src="sexy.png" alt="Community" className="feature-image" />
          <div className="feature-content">
            <h2>AI-Powered Career Growth Community</h2>
            <p>
              Join a community of learners and job seekers who are enhancing
              their interview skills through AI-driven insights. Share
              experiences, gain industry-specific knowledge, and prepare for
              career success with our comprehensive AI-powered mock interview
              platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
