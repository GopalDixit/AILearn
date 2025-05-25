import React from "react";
// import PropTypes from "prop-types";
import styles from './MockInterview.module.css';

function Compiler(props) {
  return (
    <div className={styles.editorSection}>
      <iframe
        className={styles.responsiveIframe}
        src="https://onecompiler.com/"
        // frameborder="0"
      ></iframe>
    </div>
  );
}

Compiler.propTypes = {};

export default Compiler;
