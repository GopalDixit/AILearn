import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social media icons from react-icons library

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_left}>
        <img src="AIPOWLOGO.png" alt="Website Logo" className={styles.logo} />

        <span className={styles.website_name}>AI-Powered SmartLearn</span>
      </div>
      <div className={styles.footer_middle}>
        <span className="copyright">
          &copy; {new Date().getFullYear()} All rights reserved. Email :
          xyz@gmail.com
        </span>
      </div>
      <div className={styles.footer_right}>
        <a href="https://www.facebook.com">
          <FaFacebook className="icon facebook" target="_blank" />
        </a>
        <a href="https://www.twitter.com">
          <FaTwitter className="icon twitter" />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <FaInstagram className="icon instagram" target="_blank" />
        </a>
        <a href="https://www.linkedin.com" target="_blank">
          <FaLinkedin className="icon linkedin" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
